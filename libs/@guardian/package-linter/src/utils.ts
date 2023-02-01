/** @TODO use the one from `@guardian/libs` */
export const is_defined = <T>(_: T): _ is NonNullable<T> =>
	_ !== undefined && _ !== null;
