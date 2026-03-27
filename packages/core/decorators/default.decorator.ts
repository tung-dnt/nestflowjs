/** @internal Metadata key for the default (fallback) handler. */
export const WORKFLOW_DEFAULT_EVENT = 'workflow.default';

/**
 * Method decorator that marks a handler as the fallback for unmatched events.
 *
 * When the orchestrator cannot find a valid transition for an incoming event,
 * it invokes the method decorated with `@OnDefault` before throwing.
 * Only one default handler per workflow class is allowed — subsequent
 * decorations are silently ignored.
 *
 * @example
 * ```typescript
 * @OnDefault
 * async fallback(entity: Order, event: string, payload?: any) {
 *   logger.warn(`Unhandled event ${event} for order ${entity.id}`);
 * }
 * ```
 */
export const OnDefault = (target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
  const existingFallback = Reflect.getMetadata(WORKFLOW_DEFAULT_EVENT, target.constructor);
  if (!existingFallback) {
    Reflect.defineMetadata(WORKFLOW_DEFAULT_EVENT, descriptor.value, target.constructor);
  }
  return descriptor;
};
