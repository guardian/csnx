/* eslint-disable react-hooks/rules-of-hooks --
	there's no hooks in here, but there _are_ things called useXXX etc */
import {
	type UseCase,
	useCaseAllowed,
} from '../consent-management-platform/useCases';
import { isObject } from '../isObject/isObject';
import { isString } from '../isString/isString';
import { isUndefined } from '../isUndefined/isUndefined';

interface OptionsWithUseCase {
	useCase: UseCase;
}

interface SetOptions extends OptionsWithUseCase {
	expires: string | number | Date;
}

class StorageFactory {
	#storage: Storage | undefined; // https://mdn.io/Private_class_fields

	constructor(storageHandler: 'localStorage' | 'sessionStorage') {
		try {
			const storage = window[storageHandler];
			const uid = new Date().toString();
			storage.setItem(uid, uid);
			const available = storage.getItem(uid) == uid;
			storage.removeItem(uid);
			if (available) {
				this.#storage = storage;
			}
		} catch (e) {
			// do nothing
		}
	}

	/**
	 * Check whether storage is available.
	 */
	isAvailable = (): boolean => Boolean(this.#storage);

	/**
	 * Retrieve an item from storage.
	 *
	 * @param key - the name of the item
	 */
	get = (key: string): unknown => {
		try {
			const data: unknown = JSON.parse(this.#storage?.getItem(key) ?? '');
			if (!isObject(data)) {
				return null;
			}
			const { value, expires } = data;

			// is this item has passed its sell-by-date, remove it
			if (
				(isString(expires) || typeof expires === 'number') &&
				new Date() > new Date(expires)
			) {
				this.remove(key);
				return null;
			}

			return value;
		} catch (e) {
			return null;
		}
	};

	/**
	 * Save a value to storage.
	 *
	 * @param key - the name of the item
	 * @param value - the data to save
	 * @param options - optional options
	 * @param options.useCase - the use case for this data (if user has not
	 * granted consent for this use case, the data will not be saved)
	 * @param options.expires - optional date on which this data will expire
	 */
	set(key: string, value: unknown, options: SetOptions): Promise<void>;
	set(key: string, value: unknown, expires: SetOptions['expires']): void;
	set(key: string, value: unknown): void;

	set(
		key: string,
		value: unknown,
		optionsOrExpires?: SetOptions | SetOptions['expires'],
	): void | Promise<void> {
		// Handle existing usage that doesn't pass an options object.
		// This should be remove once use-cases are compulsory.
		if (!isObject(optionsOrExpires)) {
			const expires = optionsOrExpires as SetOptions['expires'];
			return this.#storage?.setItem(
				key,
				JSON.stringify({
					value,
					expires: expires ? new Date(expires) : undefined,
				}),
			);
		}

		const { useCase, expires } = optionsOrExpires as SetOptions;

		if (isUndefined(useCase)) {
			return Promise.reject('options.useCase is required');
		}

		return useCaseAllowed(useCase).then((allowed) => {
			if (allowed) {
				return this.#storage?.setItem(
					key,
					JSON.stringify({
						value,
						expires: expires ? new Date(expires) : undefined,
					}),
				);
			}
		});
	}

	/**
	 * Remove an item from storage.
	 *
	 * @param key - the name of the item
	 */
	remove = (key: string): void => this.#storage?.removeItem(key);

	/**
	 * Removes all items from storage.
	 */
	clear = (): void => this.#storage?.clear();

	/**
	 * Retrieve an item from storage in its raw state.
	 *
	 * @param key - the name of the item
	 */
	getRaw = (key: string): string | null => this.#storage?.getItem(key) ?? null;

	/**
	 * Save a raw value to storage.
	 *
	 * @param key - the name of the item
	 * @param value - the data to save
	 */
	setRaw = (key: string, value: string): void =>
		this.#storage?.setItem(key, value);

	/**
	 * Get key by index.
	 * @returns the name of the key at that index (`string`), or `null` (if
	 *      index is out of range of if storage is unavailable) - if the index
	 *      is out of range, or if storage is not available.
	 *
	 * Wrapper for the `key` method on the native `Storage` object, with
	 * additional check for availability of storage. Note that the _order_ of
	 * keys in storage is dependent on user-agent implementation, and so you
	 * should not assume that keys will be stored in any particular order (e.g.
	 * order of insertion).
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage/key
	 */
	key = (index: number): string | null => this.#storage?.key(index) ?? null;

	/**
	 * Get the number of items in storage.
	 * @returns the number of items in storage, or `null` if storage is not
	 *  available.
	 */
	length = (): number | null => this.#storage?.length ?? null;
}

/**
 * Manages using `localStorage` and `sessionStorage`.
 *
 * Has a few advantages over the native API, including
 * - failing gracefully if storage is not available
 * - you can save and retrieve any JSONable data
 *
 * All methods are available for both `localStorage` and `sessionStorage`.
 */
export const storage = new (class {
	#local: StorageFactory | undefined;
	#session: StorageFactory | undefined;

	// creating the instance requires testing the native implementation which is
	// blocking. therefore, only create new instances of the factory when it's
	// accessed i.e. we know we're going to use it

	get local() {
		return (this.#local ||= new StorageFactory('localStorage'));
	}

	get session() {
		return (this.#session ||= new StorageFactory('sessionStorage'));
	}
})();
