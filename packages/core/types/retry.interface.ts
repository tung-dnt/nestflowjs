/**
 * Available backoff strategies for retry logic.
 *
 * - `FIXED` — constant delay between attempts.
 * - `EXPONENTIAL` — delay doubles (or multiplies) on each attempt.
 * - `EXPONENTIAL_JITTER` — exponential with randomised jitter to spread load (default).
 */
export enum RetryStrategy {
  FIXED = 'fixed',
  EXPONENTIAL = 'exponential',
  EXPONENTIAL_JITTER = 'exponential_jitter',
}

/**
 * Configuration for the {@link WithRetry} decorator.
 *
 * Attach to a workflow handler method to enable automatic retries with
 * configurable backoff. Used by adapters (e.g. {@link DurableLambdaEventHandler})
 * to wrap `orchestrator.transit()` calls.
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
 * async onProcess(@Entity() order: Order) { ... }
 * ```
 */
export interface IBackoffRetryConfig {
  /** Name of the handler method this config belongs to. */
  handler: string;
  /** Maximum number of attempts (including the initial try). */
  maxAttempts: number;
  /** Backoff strategy. Defaults to `EXPONENTIAL_JITTER`. */
  strategy?: RetryStrategy;
  /** Base delay in milliseconds before the first retry. Defaults to `1000`. */
  initialDelay?: number;
  /** Multiplier applied on each attempt for exponential strategies. Defaults to `2`. */
  backoffMultiplier?: number;
  /** Upper bound for computed delay in milliseconds. Defaults to `60000`. */
  maxDelay?: number;
  /** `true` for full jitter, or a number `0–1` for partial jitter percentage. */
  jitter?: boolean | number;
}

/**
 * Minimal interface for a retry-capable handler.
 */
export interface IRetryHandler {
  execute: () => Promise<void>;
}
