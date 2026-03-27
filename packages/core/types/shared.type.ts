/**
 * Helper that maps all keys unique to `T` (not in `U`) to `never`.
 * Used internally by {@link TEither} to enforce mutually exclusive unions.
 */
export type TWithout<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

/**
 * A true mutually exclusive union of two object types.
 *
 * Unlike `T | U`, this prevents accidentally mixing properties from both
 * types in a single value — only one side is allowed at a time.
 */
export type TEither<T, U> = T extends object ? (U extends object ? (TWithout<T, U> & U) | (TWithout<U, T> & T) : U) : T;

/**
 * A human-readable duration used for timeout configuration throughout the
 * library (callback waits, idle state timeouts, retry delays, etc.).
 *
 * At least one field should be set. Fields are additive when the consuming
 * code converts them — e.g. `{ minutes: 1, seconds: 30 }` = 90 seconds.
 */
export interface Duration {
  hours?: number;
  minutes?: number;
  seconds?: number;
}
