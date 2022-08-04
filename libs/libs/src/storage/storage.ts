class StorageFactory {
	#storage: Storage | undefined; // https://mdn.io/Private_class_fields

	constructor(storage: Storage) {
		try {
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
	 */
	isAvailable(): boolean {
		return Boolean(this.#storage);
	}

	/* eslint-disable
		@typescript-eslint/no-unsafe-assignment,
		@typescript-eslint/no-explicit-any,
		@typescript-eslint/no-unsafe-argument
		--
		- we're using the `try` to handle anything bad happening
		- JSON.parse returns an `any`, we really are with an `any`
	*/
	/**
	 * Retrieve an item from storage.
	 *
	 * @param key - the name of the item
	 */
	get(key: string): any {
		try {
			const { value, expires } = JSON.parse(this.#storage?.getItem(key) ?? '');

			// is this item has passed its sell-by-date, remove it
			if (expires && new Date() > new Date(expires)) {
				this.remove(key);
				return null;
			}

			return value;
		} catch (e) {
			return null;
		}
	}
	/* eslint-enable
		@typescript-eslint/no-unsafe-assignment,
		@typescript-eslint/no-explicit-any,
		@typescript-eslint/no-unsafe-argument
	*/

	/**
	 * Save a value to storage.
	 *
	 * @param key - the name of the item
	 * @param value - the data to save
	 * @param expires - optional date on which this data will expire
	 */
	set(key: string, value: unknown, expires?: string | number | Date): void {
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
	 * @param key - the name of the item
	 */
	remove(key: string): void {
		return this.#storage?.removeItem(key);
	}

	/**
	 * Removes all items from storage.
	 */
	clear(): void {
		return this.#storage?.clear();
	}

	/**
	 * Retrieve an item from storage in its raw state.
	 *
	 * @param key - the name of the item
	 */
	getRaw(key: string): string | null {
		return this.#storage?.getItem(key) ?? null;
	}

	/**
	 * Save a raw value to storage.
	 *
	 * @param key - the name of the item
	 * @param value - the data to save
	 */
	setRaw(key: string, value: string): void {
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
	#local: StorageFactory | undefined;
	#session: StorageFactory | undefined;

	// creating the instance requires testing the native implementation
	// which is blocking. therefore, only create new instances of the factory
	// when it's accessed i.e. we know we're going to use it

	get local() {
		return (this.#local ||= new StorageFactory(localStorage));
	}

	get session() {
		return (this.#session ||= new StorageFactory(sessionStorage));
	}
})();
