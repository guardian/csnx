/** A method to create type-guard for string unions */
export const guard =
	<T extends readonly unknown[]>(array: T) =>
	(value: unknown): value is (typeof array)[number] =>
		array.includes(value);

/** infers type from guard function */
export type Guard<T extends (value: unknown) => value is unknown> = T extends (
	value: unknown,
) => value is infer G
	? G
	: never;
