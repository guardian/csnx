/**
 * Wrapper for https://github.com/astoilkov/use-local-storage-state that:
 *
 * - adds a `validator` option
 * - serializes the data stored in localStorage in a format that matches the
 *   format used by @guardian/libs#storage
 *
 * The `validator` option is necessary because unlike with `useState#state`,
 * anything in localStorage can be affected by code outside the current
 * application. Therefore, we cannot guarantee that the data we retrieve
 * matches the type we stored without validation.
 */

import { useMemo, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import type {
	LocalStorageOptions,
	LocalStorageState,
} from 'use-local-storage-state';

/** A function that checks if a value is of a certain type. */
type Validator<T> = (value: unknown) => value is T;

/** Infer the type that a validator checks for. */
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

export function useStoredState(
	key: string,
	options?: Omit<Options<unknown>, 'validator'>,
): LocalStorageState<unknown>;

// If `validator` is provided, we infer the return type from the validated type.
export function useStoredState<
	P extends Validator<unknown>,
	T = ValidatesAs<P>,
>(key: string, options?: Options<T>): LocalStorageState<T>;

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
		if (validator) {
			if (validator(state)) {
				return state;
			}

			if (defaultValue) {
				return defaultValue;
			}

			throw new Error(
				"Invalid state in local storage and no `defaultValue` was provided. There's no way of returning a valid state.",
			);
		}
		return state;
	}, [validator, state, defaultValue]);

	return [validatedState, setState, rest];
}
