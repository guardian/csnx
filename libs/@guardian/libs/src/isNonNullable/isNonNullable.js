/**
 * Type guard for values that are neither `null` nor `undefined`
 * @type {<T>(_: T) => _ is NonNullable<T>}
 */
export const isNonNullable = (_) => _ !== undefined && _ !== null;
