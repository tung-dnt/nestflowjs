import { Injectable, type Logger } from '@nestjs/common';
import type { IWorkflowDefinition, IWorkflowEntity } from '../types';
import { RouterService } from './router.service';

/**
 * Factory that creates {@link RouterService} instances with the correct
 * generic parameters for a given workflow event.
 *
 * Registered as a singleton via {@link WorkflowModule} and injected into
 * {@link OrchestratorService}.
 */
@Injectable()
export class StateRouterHelperFactory {
  /** Create a new {@link RouterService} scoped to a single event dispatch. */
  create<T, Event, State>(
    event: Event,
    entityService: IWorkflowEntity,
    workflowDefinition: IWorkflowDefinition<T, Event, State>,
    logger: Logger,
  ): RouterService<T, Event, State> {
    return new RouterService(event, entityService, workflowDefinition, logger);
  }
}
