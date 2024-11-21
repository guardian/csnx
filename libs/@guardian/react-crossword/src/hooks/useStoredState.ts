/**
 * Wrapper for https://github.com/astoilkov/use-local-storage-state that:
 *
 * - adds a `validator` option
 * - serializes the data stored in localStorage in a format that matches the
 *   format used by @guardian/libs#storage
 *
 * The `validator` option is necessary because unlike with `useState#state`,
 * anything in localStorage can be affected by code outside the current
 * application. Therefore, we cannot guarantee that the data we retrieve matches
 * the type we stored without validation.
 */

import { useMemo, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import type {
	LocalStorageOptions,
	LocalStorageState,
} from 'use-local-storage-state';

/**
 * A function that checks if a value is of a certain type and returns a type predicate.
 *
 * @link https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 */
type Validator<T> = (value: unknown) => value is T;

/** Infer the type predicate returned by a Validator. */
type ValidatesAs<V> = V extends (value: unknown) => value is infer T
	? T
	: never;

// serializer to read/write stored data in our extended format
// https://github.com/guardian/csnx/blob/main/libs/%40guardian/libs/src/storage/storage.ts
const serializer: LocalStorageOptions<unknown>['serializer'] = {
	stringify: (_) => JSON.stringify({ value: _ }),
	parse: (_) => (JSON.parse(_) as { value: unknown }).value,
};

type Options<T> = Omit<LocalStorageOptions<T>, 'serializer'> & {
	validator?: Validator<T>;
};

// Defined the overloads of `useStoredState`...

// With no `validator`, returned `state` will be `unknown`.
export function useStoredState(
	key: string,
	options?: Omit<Options<unknown>, 'validator'>,
): LocalStorageState<unknown>;

// If `validator` is provided, we can infer a type of `state`.
export function useStoredState<
	V extends Validator<unknown>,
	T = ValidatesAs<V>,
>(key: string, options?: Options<T>): LocalStorageState<T>;

// Implementation...
export function useStoredState<T>(
	key: string,
	options?: Options<T>,
): LocalStorageState<T | undefined> {
	const { validator } = options ?? {};
	const [defaultValue] = useState(options?.defaultValue);

	const [state, setState, rest] = useLocalStorageState(key, {
		...options,
		serializer,
	});

	const validatedState = useMemo(() => {
		// If no validator is provided, just use the state we have.
		if (!validator) {
			return state;
		}

		// If the state is valid, return it (now properly typed).
		if (validator(state)) {
			return state;
		}

		// The state is invalid, so return the default value (which may be
		// undefined).
		return defaultValue;
	}, [validator, state, defaultValue]);

	return [validatedState, setState, rest];
}
