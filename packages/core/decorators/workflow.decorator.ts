import type { IWorkflowDefinition } from '@/core';

/** @internal Metadata key for the workflow definition on a class. */
export const WORKFLOW_DEFINITION_KEY = 'workflow:definition';

/**
 * Class decorator that declares a NestJS class as a workflow.
 *
 * Stores the {@link IWorkflowDefinition} as metadata so the
 * {@link OrchestratorService} can discover it at module init and build
 * the routing table for state transitions.
 *
 * @typeParam T     - Entity type
 * @typeParam Event - Union of event names
 * @typeParam State - Union of state values
 *
 * @param definition - The full workflow definition (states, transitions, entity service).
 *
 * @example
 * ```typescript
 * @Workflow<Order, OrderEvent, OrderStatus>({
 *   name: 'OrderWorkflow',
 *   states: {
 *     finals: [OrderStatus.Completed],
 *     idles:  [OrderStatus.Pending],
 *     failed: OrderStatus.Failed,
 *   },
 *   transitions: [ ... ],
 *   entityService: 'entity.order',
 * })
 * export class OrderWorkflow { ... }
 * ```
 */
export function Workflow<T, Event, State>(definition: IWorkflowDefinition<T, Event, State>) {
  return <T extends { new (...args: any[]): {} }>(instance: T) => {
    Reflect.defineMetadata(WORKFLOW_DEFINITION_KEY, definition, instance);

    return instance;
  };
}
