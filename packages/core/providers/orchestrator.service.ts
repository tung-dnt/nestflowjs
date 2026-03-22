import { BadRequestException, Injectable, Logger, type OnModuleInit } from '@nestjs/common';
// biome-ignore lint/style/useImportType: NestJS DI requires value imports for class injection tokens
import { DiscoveryService, ModuleRef } from '@nestjs/core';
import type {
  IBackoffRetryConfig,
  IWorkflowDefaultRoute,
  IWorkflowDefinition,
  IWorkflowEntity,
  IWorkflowHandler,
  TDefaultHandler,
} from '@/core';
import { getRetryKey, WORKFLOW_DEFAULT_EVENT, WORKFLOW_DEFINITION_KEY, WORKFLOW_HANDLER_KEY } from '@/core';
import type { IBrokerPublisher, IWorkflowEvent } from '@/event-bus';
import { UnretriableException } from '@/exception/unretriable.exception';
// biome-ignore lint/style/useImportType: NestJS DI requires value imports for class injection tokens
import { StateRouterHelperFactory } from './router.factory';

/**
 * TODO:
 * 1. Checkpointing for long-running tasks (Serverless)
 *   +) BrokerPublisher.publish will implement delay queue via time calculated from RetryService.execute()
 * 2. Retry Service: Retry in state handler level via `IRetryHandler`
 *   +) Bind configs to lambda retry config
 */
@Injectable()
export class OrchestratorService implements OnModuleInit {
  private routes = new Map<string, IWorkflowDefaultRoute>();
  private readonly logger = new Logger(OrchestratorService.name);

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly routerHelperFactory: StateRouterHelperFactory,
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    const providers = this.discoveryService.getProviders();
    for (const provider of providers) {
      const { instance } = provider;
      if (!instance || !instance.constructor) continue;

      const [workflowDefinition, handlerStore, defaultHandler] = [
        Reflect.getMetadata(WORKFLOW_DEFINITION_KEY, instance.constructor) as IWorkflowDefinition<
          object,
          string,
          string
        >,
        Reflect.getMetadata(WORKFLOW_HANDLER_KEY, instance.constructor) as IWorkflowHandler[],
        Reflect.getMetadata(WORKFLOW_DEFAULT_EVENT, instance.constructor) as TDefaultHandler<object>,
        [],
      ];

      if (!handlerStore || handlerStore.length === 0 || !workflowDefinition) continue;

      const brokerPublisher = this.moduleRef.get<IBrokerPublisher>(workflowDefinition.brokerPublisher, {
        strict: true,
      });
      const entityService = this.moduleRef.get<IWorkflowEntity>(workflowDefinition.entityService, { strict: true });

      for (const handler of handlerStore) {
        if (this.routes.has(handler.event)) {
          throw new Error(
            `Duplicate workflow event handler detected for event: ${handler.event} in workflow: ${workflowDefinition.name}`,
          );
        }
        // Retrieve retry config from metadata on the handler function (not from DI container)
        const retryConfig = Reflect.getMetadata(getRetryKey(handler.name), handler.handler) as
          | IBackoffRetryConfig
          | undefined;

        this.routes.set(handler.event, {
          handler: handler.handler,
          definition: workflowDefinition,
          instance,
          handlerName: handler.name,
          retryConfig,
          defaultHandler,
          entityService,
          brokerPublisher,
        });
      }
    }
    this.logger.log(`StateRouter initialized with ${this.routes.size} routes: `, Array.from(this.routes.keys()));
  }

  async transit(params: IWorkflowEvent) {
    const { urn, payload, topic: event } = params;

    const route = this.routes.get(event);
    if (!route) throw new BadRequestException(`No workflow found for event: ${event}`);
    const { definition, instance, defaultHandler, entityService } = route;

    if (!definition) {
      const className = instance.name;
      throw new BadRequestException(
        `Workflow definition metadata is missing for controller class "${className}". Ensure @Workflow(...) is applied to the class and that decorators are not reordered.`,
      );
    }

    const logger = new Logger(`Router::${definition.name}`);
    const routerHelper = this.routerHelperFactory.create(event, entityService, definition, logger);
    logger.log(`Method ${route.handlerName} is being called with arguments:`, params);

    // ========================= BEGIN routing logic =========================
    let entity = await routerHelper.loadAndValidateEntity(urn);

    const entityStatus = entityService.status(entity);
    let transition = routerHelper.findValidTransition(entity, payload);
    let stepPayload = payload;

    if (!transition) {
      // Check if a transition exists for this event from the current state (ignoring conditions).
      // This distinguishes "conditions not met" from "completely invalid event for this state".
      const hasMatchingTransition = definition.transitions.some((t) => {
        const events = Array.isArray(t.event) ? t.event : [t.event];
        const states = (Array.isArray(t.from) ? t.from : [t.from]) as Array<string | number>;
        return (events as string[]).includes(event) && states.includes(entityStatus as string | number);
      });

      // Idle states: silently wait when conditions aren't met (transition exists but failed conditions)
      if (hasMatchingTransition && routerHelper.isInIdleStatus(entity)) {
        logger.log(`Entity ${urn} is in idle state ${entityStatus}. Conditions not met — waiting for next event.`);
        return;
      }
      if (defaultHandler) {
        logger.log(`Falling back to the default transition`, urn);
        await defaultHandler.call(instance, entity, event, payload);
      }
      throw new BadRequestException(
        `No matched transition for event: ${event}, status: ${entityStatus}. Please verify your workflow definition!`,
      );
    }

    try {
      let isAutoTransition = false;
      while (transition) {
        logger.log('======= WORKFLOW STEP STARTED =======');

        // Idle state check: only block auto-transitions, not explicit event triggers
        if (isAutoTransition && routerHelper.isInIdleStatus(entity)) {
          logger.log(`Auto-transition stopped at idle state ${entityService.status(entity)}. Waiting for explicit event. (${urn})`);
          break;
        }

        const currentEntityStatus = entityService.status(entity);
        logger.log(`Executing transition from ${currentEntityStatus} to ${transition.to} (${urn})`);

        // Get the correct handler for the current transition event
        const currentEvent = Array.isArray(transition.event) ? transition.event[0] : transition.event;
        const currentRoute = this.routes.get(currentEvent as string);
        if (!currentRoute) {
          throw new BadRequestException(`No handler found for event: ${currentEvent}`);
        }
        const { handlerName, handler } = currentRoute;
        const args = routerHelper.buildParamDecorators(entity, stepPayload, instance, handlerName);

        stepPayload = await handler.apply(instance, args);

        // Update entity status
        entity = await entityService.update(entity, transition.to);
        logger.log(`Element transitioned from ${currentEntityStatus} to ${transition.to} (${urn})`);

        const updatedStatus = entityService.status(entity);

        const definedFinalStates = definition.states.finals as Array<string | number>;
        if (definedFinalStates.includes(updatedStatus)) {
          logger.log(`Element ${urn} reached final state: ${updatedStatus}`);
          break;
        }

        // Get next event for automatic transitions
        isAutoTransition = true;
        transition = routerHelper.findValidTransition(entity, stepPayload, {
          skipEventCheck: true,
        });
        if (!transition) {
          logger.warn(`There's no valid next transition from ${updatedStatus} or the condition is not met. (${urn})`);
        }

        logger.log(`Next event: ${transition?.event ?? 'none'} Next status: ${updatedStatus} (${urn})`);
      }
    } catch (e) {
      await entityService.update(entity, definition.states.failed);
      logger.error(`Transition failed. Setting status to failed (${(e as Error).message})`, urn);
      // UnretriableException signals a permanent failure — don't rethrow so the
      // message is not retried by the broker/Lambda adapter.
      if (!(e instanceof UnretriableException)) {
        throw e;
      }
    }
  }
}
