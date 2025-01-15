/**
 * Wrapper for https://github.com/astoilkov/use-local-storage-state that:
 *
 * - adds a `validator` option
 * - makes `defaultValue` required
 * - provides our own serializer to keep the data stored in localStorage in a
 *   format that matches the format used by @guardian/libs#storage
 *
 * The `validator` option is necessary because unlike with `useState#state`,
 * anything in localStorage can be affected by code outside the current
 * application. Therefore, we cannot guarantee that the data we retrieve matches
 * the type we stored without validation.
 */

import { useMemo, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import type { LocalStorageOptions } from 'use-local-storage-state';

/**
 * A function that checks if a value is of a certain type and returns a type
 * predicate.
 *
 * @link
 * https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
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
	validator: Validator<T>;
	defaultValue: NonNullable<LocalStorageOptions<T>['defaultValue']>;
};

export function useStoredState<
	V extends Validator<unknown>,
	T = ValidatesAs<V>,
>(key: string, { validator, ...options }: Options<T>) {
	const [defaultValue] = useState(options.defaultValue);

	const [state, setState, rest] = useLocalStorageState(key, {
		...options,
		serializer,
	});

	const validatedState: T = useMemo(() => {
		// If the state is valid, return it (now properly typed).
		if (validator(state)) {
			return state;
		}

		// The state is invalid, set the state to the default value and return the default value
		// (which may be undefined).
		setState(defaultValue);
		return defaultValue;
	}, [validator, state, setState, defaultValue]);

	return [validatedState, setState, rest] as const;
}
