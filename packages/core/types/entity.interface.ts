/**
 * Contract for the persistence layer of a workflow entity.
 *
 * Implement this interface in an `@Injectable()` service and register it with
 * {@link WorkflowModule.register} under the injection token referenced by
 * your `@Workflow({ entityService })` definition.
 *
 * @typeParam T     - The entity type (e.g. `Order`, `User`)
 * @typeParam State - The enum or union of valid entity states
 *
 * @example
 * ```typescript
 * @Injectable()
 * export class OrderEntityService implements IWorkflowEntity<Order, OrderStatus> {
 *   async create() { ... }
 *   async load(urn) { ... }
 *   async update(entity, status) { ... }
 *   status(entity) { return entity.status; }
 *   urn(entity) { return entity.id; }
 * }
 * ```
 */
export interface IWorkflowEntity<T = any, State = string | number> {
  /**
   * Creates a new instance of the entity
   * @returns A new entity instance
   */
  create(): Promise<T>;

  /**
   * Updates the status of an entity
   * @param entity The entity to update
   * @param status The new status
   * @returns The updated entity
   */
  update(entity: T, status: State): Promise<T>;

  /**
   * Loads an entity by its URN
   * @param urn The unique resource name of the entity
   * @returns The loaded entity
   */
  load(urn: string | number): Promise<T | null>;

  /**
   * Gets the current status of an entity
   * @param entity The entity
   * @returns The current status
   */
  status(entity: T): State;

  /**
   * Gets the URN of an entity
   * @param entity The entity
   * @returns The entity's URN
   */
  urn(entity: T): string | number;
}
