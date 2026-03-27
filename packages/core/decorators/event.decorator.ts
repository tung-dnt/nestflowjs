import type { IWorkflowHandler } from '@/core';

/** @internal Metadata key for the list of event handlers on a workflow class. */
export const WORKFLOW_HANDLER_KEY = 'workflow:metadata';

/**
 * Method decorator that registers a handler for a specific workflow event.
 *
 * The event name must match a transition's `event` field in the workflow
 * definition. The orchestrator discovers these handlers at module init
 * and routes incoming {@link IWorkflowEvent}s to the correct method.
 *
 * @param event - The event name this method handles (e.g. `'order.submit'`).
 *
 * @example
 * ```typescript
 * @OnEvent('order.submit')
 * async onSubmit(@Entity() order: Order, @Payload() data: SubmitDto) {
 *   // transition logic
 * }
 * ```
 */
export const OnEvent = (event: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  let workflowHandlers: IWorkflowHandler[] = Reflect.getMetadata(WORKFLOW_HANDLER_KEY, target.constructor);

  if (!workflowHandlers) {
    workflowHandlers = [];
    Reflect.defineMetadata(WORKFLOW_HANDLER_KEY, workflowHandlers, target.constructor);
  }

  workflowHandlers.push({ event, handler: descriptor.value, name: propertyKey });

  return descriptor;
};
