/**
 * The event object passed into {@link OrchestratorService.transit} to trigger
 * a state transition.
 *
 * @typeParam T - Type of the optional payload data.
 *
 * @example
 * ```typescript
 * const event: IWorkflowEvent = {
 *   event: 'order.submit',
 *   urn: 'order-123',
 *   payload: { items: [{ sku: 'ABC', qty: 2 }] },
 *   attempt: 0,
 * };
 * ```
 */
export interface IWorkflowEvent<T = any> {
  /** Event name that matches a transition's `event` field. */
  event: string;
  /** Unique resource name identifying the entity instance. */
  urn: string | number;
  /** Optional data forwarded to the handler and transition conditions. */
  payload?: T | object | string;
  /** Zero-based retry attempt counter, managed by the adapter. */
  attempt: number;
}
