/**
 * Create [type predicates][] that narrow primitives
 * to [literal][] [type unions][].
 *
 * [type predicates]: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 * [literal]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types
 * [type unions]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types
 *
 * @example
 * import { literalUnionPredicate } from '@guardian/libs';
 *
 * const stages = ["PROD", "CODE", "DEV"] as const;
 * const isStage = literalUnionPredicate(stages);
 *
 * if(!isStage("NOT_A_STAGE")) throw new Error("Invalid stage")
 */
export const literalUnionPredicate =
	<Literals extends ReadonlyArray<string | number>>(literals: Literals) =>
	(value: string | number): value is Literals[number] =>
		literals.includes(value);

/**
 * Extract the literal union from a type predicate method.
 * Companion to literalUnionPredicate
 *
 */
export type LiteralUnion<
	Predicate extends (value: unknown) => value is unknown,
> = Predicate extends (value: unknown) => value is infer LiteralUnion
	? LiteralUnion
	: never;
