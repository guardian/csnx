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

import type { LocalStorageOptions } from 'use-local-storage-state';

// serializer to read/write stored data in our extended format
// https://github.com/guardian/csnx/blob/main/libs/%40guardian/libs/src/storage/storage.ts
export const serializer: LocalStorageOptions<unknown>['serializer'] = {
	stringify: (_) => JSON.stringify({ value: _ }),
	parse: (_) => (JSON.parse(_) as { value: unknown }).value,
};
