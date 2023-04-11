import { isObject } from '../isObject/isObject.js';
import { isString } from '../isString/isString.js';

class StorageFactory {
	/**
	 * https://mdn.io/Private_class_fields
	 * @type {Storage | undefined}
	 */
	#storage;

	/** @param storageHandler {'localStorage' | 'sessionStorage'}  */
	constructor(storageHandler) {
		try {
			const storage = window[storageHandler];
			const uid = new Date().toString();
			storage.setItem(uid, uid);
			const available = storage.getItem(uid) == uid;
			storage.removeItem(uid);
			if (available) this.#storage = storage;
		} catch (e) {
			// do nothing
		}
	}

	/**
	 * Check whether storage is available.
	 * @returns {boolean}
	 */
	isAvailable() {
		return Boolean(this.#storage);
	}

	/**
	 * Retrieve an item from storage.
	 *
	 * @param key {string} the name of the item
	 * @returns {unknown}
	 */
	get(key) {
		try {
			/** @type unknown */
			const data = JSON.parse(this.#storage?.getItem(key) ?? '');
			if (!isObject(data)) return null;
			const { value, expires } = data;

			// is this item has passed its sell-by-date, remove it
			if (isString(expires) && new Date() > new Date(expires)) {
				this.remove(key);
				return null;
			}

			return value;
		} catch (e) {
			return null;
		}
	}

	/**
	 * Save a value to storage.
	 *
	 * @param key {string} the name of the item
	 * @param value {unknown} the data to save
	 * @param [expires] {string | number | Date} optional date on which this data will expire
	 * @returns {void}
	 */
	set(key, value, expires) {
		return this.#storage?.setItem(
			key,
			JSON.stringify({
				value,
				expires,
			}),
		);
	}

	/**
	 * Remove an item from storage.
	 *
	 * @param key {string} the name of the item
	 * @returns {void}
	 */
	remove(key) {
		return this.#storage?.removeItem(key);
	}

	/**
	 * Removes all items from storage.
	 * @returns {void}
	 */
	clear() {
		return this.#storage?.clear();
	}

	/**
	 * Retrieve an item from storage in its raw state.
	 *
	 * @param key {string} the name of the item
	 * @returns {string | null}
	 */
	getRaw(key) {
		return this.#storage?.getItem(key) ?? null;
	}

	/**
	 * Save a raw value to storage.
	 *
	 * @param key {string} the name of the item
	 * @param value {string} the data to save
	 * @returns {void}
	 */
	setRaw(key, value) {
		return this.#storage?.setItem(key, value);
	}
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
	/** @type {StorageFactory | undefined}*/
	#local;
	/** @type {StorageFactory | undefined}*/
	#session;

	// creating the instance requires testing the native implementation
	// which is blocking. therefore, only create new instances of the factory
	// when it's accessed i.e. we know we're going to use it

	get local() {
		return (this.#local ||= new StorageFactory('localStorage'));
	}

	get session() {
		return (this.#session ||= new StorageFactory('sessionStorage'));
	}
})();
