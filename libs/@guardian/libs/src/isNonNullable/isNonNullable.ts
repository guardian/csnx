/** Type guard for values that are neither `null` nor `undefined` */
export const isNonNullable = <T>(_: T): _ is NonNullable<T> =>
	_ !== undefined && _ !== null;
