/**
 * Wraps a simple boolean value for easier async.
 * Observable<boolean> does not resolve if value is false, so you cannot switch on it.
 * Observable<BooleanValue> resolves because it's an object.
 */
export interface BooleanValue {
  value: boolean;
}
