import { storage as libsStorage } from '@guardian/libs';
import { hasConsentForUseCaseWithConsentState } from './hasConsentForUseCase';
import { onConsent } from './onConsent';
import { ConsentState } from './types';
import type { ConsentUseCases } from './types/consentUseCases';


export const storageOptions = [
	"localStorage",
	"sessionStorage"
] as const;
export type StorageOptions = typeof storageOptions[number];
class StorageFactory {
	#storageHandler: StorageOptions;

	constructor(storageHandler: StorageOptions) {
		this.#storageHandler = storageHandler;
	}

	/**
	 * Check whether storage is available.
	 */
	isAvailable(): boolean {
		switch(this.#storageHandler) {
			case 'localStorage': {
				return Boolean(libsStorage.local.isAvailable())
			}
			case 'sessionStorage': {
				return Boolean(libsStorage.session.isAvailable())
			}
		}
	}

	/**
	 * Retrieve an item from storage.
	 *
	 * @param useCase - the ConsentUseCase for which to get the data
	 * @param key - the name of the item
	 */
	async get(useCase: ConsentUseCases, key: string): Promise<unknown> {
			const consentState = await onConsent();
		return(this.getWithConsentState(useCase, consentState, key))
	}

	/**
	 * Retrieve an item from storage.
	 *
	 * @param useCase - the ConsentUseCase for which to get the data
	 * @param consentState - the ConsentState to check if consent for the useCase has been given
	 * @param key - the name of the item
	 */
	getWithConsentState(useCase: ConsentUseCases, consentState: ConsentState, key: string): unknown {
		console.log('in cmp get storage');
		if(hasConsentForUseCaseWithConsentState(useCase, consentState))
		{
			switch(this.#storageHandler) {
				case 'localStorage': {
					console.log('in cmp get local');
					return libsStorage.local.get(key)
				}
				case 'sessionStorage': {
					console.log('in cmp get session');
					return libsStorage.session.get(key)
				}
			}
		}
		else
		{
			console.error('cmp', `Cannot get local storage item ${key} due to missing consent for use-case ${useCase}`)
			return(null)
		}
	}

		/**
	 * Save a value to storage.
	 *
	 * @param useCase - the ConsentUseCase for which to get the data
	 * @param key - the name of the item
	 * @param value - the data to save
	 * @param expires - optional date on which this data will expire
	 */
	async set(useCase:ConsentUseCases, key: string, value: unknown, expires?: string | number | Date): Promise<void> {
		const consentState = await onConsent();
		return(this.setWithConsentState(useCase, consentState, key, value, expires))
	}

	/**
	 * Save a value to storage.
	 *
	 * @param useCase - the ConsentUseCase for which to get the data
	 * @param consentState - the ConsentState to check if consent for the useCase has been given
	 * @param key - the name of the item
	 * @param value - the data to save
	 * @param expires - optional date on which this data will expire
	 */
	setWithConsentState(useCase:ConsentUseCases, consentState: ConsentState, key: string, value: unknown, expires?: string | number | Date): void {
		console.log('in cmp set storage');
		if(hasConsentForUseCaseWithConsentState(useCase, consentState))
		{
			switch(this.#storageHandler) {
				case 'localStorage': return libsStorage.local.set(key, value, expires)
				case 'sessionStorage': return libsStorage.session.set(key, value, expires)
			}
		}
		else
		{
			console.error('cmp', `Cannot set local storage item ${key} due to missing consent for use-case ${useCase}`)
		}
	}

	/**
	 * Remove an item from storage.
	 *
	 * @param key - the name of the item
	 */
	remove(key: string): void {

		switch(this.#storageHandler) {
			case 'localStorage': {
				return libsStorage.local.remove(key);
			}
			case 'sessionStorage': {
				return libsStorage.session.remove(key);
			}
		}
	}

	/**
	 * Removes all items from storage.
	 */
	clear(): void {

		switch(this.#storageHandler) {
			case 'localStorage': {
				return libsStorage.local.clear();
			}
			case 'sessionStorage': {
				return libsStorage.session.clear();
			}
		}
	}

	/**
	 * Retrieve an item from storage in its raw state.
	 *
	 * @param useCase - the ConsentUseCase for which to get the data
	 * @param key - the name of the item
	 */
	async getRaw(useCase: ConsentUseCases, key: string): Promise<string | null> {
		const consentState = await onConsent();
		return(this.getRawWithConsentState(useCase,consentState,key))
	}

	/**
	 * Retrieve an item from storage in its raw state.
	 *
	 * @param useCase - the ConsentUseCase for which to get the data
	 * @param consentState - the ConsentState to check if consent for the useCase has been given
	 * @param key - the name of the item
	 */
	getRawWithConsentState(useCase: ConsentUseCases, consentState: ConsentState, key: string): string | null {
		if(hasConsentForUseCaseWithConsentState(useCase, consentState))
		{
			switch(this.#storageHandler) {
				case 'localStorage': {
					return libsStorage.local.getRaw(key)
				}
				case 'sessionStorage': {
					return libsStorage.session.getRaw(key)
				}
			}
		}
		else
		{
			console.error('cmp', `Cannot get local storage item ${key} due to missing consent for use-case ${useCase}`)
			return(null)
		}
	}

	/**
	 * Save a raw value to storage.
	 *
	 * @param useCase - the ConsentUseCase for which to get the data
	 * @param key - the name of the item
	 * @param value - the data to save
	 */
	async setRaw(useCase: ConsentUseCases, key: string, value: string): Promise<void> {
		const consentState = await onConsent();
		return(this.setRawWithConsentState(useCase, consentState, key, value))
	}

	/**
	 * Save a raw value to storage.
	 *
	 * @param useCase - the ConsentUseCase for which to get the data
	 * @param consentState - the ConsentState to check if consent for the useCase has been given
	 * @param key - the name of the item
	 * @param value - the data to save
	 */
	setRawWithConsentState(useCase: ConsentUseCases, consentState: ConsentState, key: string, value: string): void {
		if(hasConsentForUseCaseWithConsentState(useCase, consentState))
		{
			switch(this.#storageHandler) {
				case 'localStorage': return libsStorage.local.setRaw(key, value)
				case 'sessionStorage': return libsStorage.session.setRaw(key, value)
			}
		}
		else
		{
			console.error('cmp', `Cannot set local storage item ${key} due to missing consent for use-case ${useCase}`)
		}
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
		return (this.#local ||= new StorageFactory('localStorage'));
	}

	get session() {
		return (this.#session ||= new StorageFactory('sessionStorage'));
	}
})();

