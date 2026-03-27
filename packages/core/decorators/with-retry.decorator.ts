import type { IBackoffRetryConfig } from '../types';

/** @internal Base metadata key for retry configuration. */
const WITH_RETRY_KEY = 'workflow:retry';

/**
 * Build the metadata key for a specific handler's retry config.
 * @internal
 */
export const getRetryKey = (propertyKey: string) => `${WITH_RETRY_KEY}:${propertyKey}`;

/**
 * Method decorator that attaches retry configuration to a workflow handler.
 *
 * When an adapter (e.g. {@link DurableLambdaEventHandler}) executes the
 * transition, it reads this metadata and wraps the call with automatic
 * retries using the specified backoff strategy.
 *
 * @param config - Backoff retry configuration (strategy, attempts, delays).
 *
 * @example
 * ```typescript
 * @OnEvent('order.process')
 * @WithRetry({
 *   handler: 'onProcess',
 *   maxAttempts: 3,
 *   strategy: RetryStrategy.EXPONENTIAL_JITTER,
 *   initialDelay: 500,
 * })
 * async onProcess(@Entity() order: Order) {
 *   // may throw — will be retried up to 3 times
 * }
 * ```
 */
export function WithRetry(config: IBackoffRetryConfig) {
  return (_target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(getRetryKey(propertyKey), config, descriptor.value);
    return descriptor;
  };
}
