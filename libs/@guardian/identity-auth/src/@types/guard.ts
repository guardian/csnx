/** @deprecated – favour `literalUnionPredicate` from `@guardian/libs` */
export const guard =
	<T extends readonly unknown[]>(array: T) =>
	(value: unknown): value is (typeof array)[number] =>
		array.includes(value);

/** @deprecated favour `LiteralUnion` from `@guardian/libs` */
export type Guard<T extends (value: unknown) => value is unknown> = T extends (
	value: unknown,
) => value is infer G
	? G
	: never;
