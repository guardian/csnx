import { jest } from '@jest/globals';
import { storage } from './storage';

function functionThatThrowsAnError(): never {
	throw new Error('bang');
}

type StorageName = 'local' | 'session';
const LOCAL: StorageName = 'local';
const SESSION: StorageName = 'session';

describe.each([
	[LOCAL, storage[LOCAL], globalThis.localStorage],
	[SESSION, storage[SESSION], globalThis.sessionStorage],
])('storage.%s', (name, implementation, native) => {
	let getSpy: jest.SpiedFunction<Storage['getItem']>;
	let setSpy: jest.SpiedFunction<Storage['setItem']>;

	beforeEach(() => {
		getSpy = jest.spyOn(Object.getPrototypeOf(native) as Storage, 'getItem');
		setSpy = jest.spyOn(Object.getPrototypeOf(native) as Storage, 'setItem');
		jest.resetModules();
		native.clear();
	});

	afterEach(() => {
		getSpy.mockRestore();
		setSpy.mockRestore();
	});

	it(`detects native API availability`, async () => {
		expect(implementation.isAvailable()).toBe(true);

		setSpy.mockImplementation(functionThatThrowsAnError);
		getSpy.mockImplementation(functionThatThrowsAnError);

		// re-import now we've disabled native storage API
		const { storage } = await import('./storage');
		expect(storage[name].isAvailable()).toBe(false);
	});

	it(`is not available if getItem does not return what you setItem`, async () => {
		getSpy.mockImplementation(() => '🚫');

		// re-import now we've fiddled with the native storage API
		const { storage } = await import('./storage');
		expect(storage[name].isAvailable()).toBe(false);
	});

	it(`behaves nicely when storage is not available`, async () => {
		setSpy.mockImplementation(functionThatThrowsAnError);
		getSpy.mockImplementation(functionThatThrowsAnError);

		// re-import now we've disabled native storage API
		const { storage } = await import('./storage');
		expect(() => storage[name].set('🚫', true)).not.toThrow();
		expect(() => storage[name].get('🚫')).not.toThrow();
		expect(() => storage[name].remove('🚫')).not.toThrow();
		expect(() => storage[name].getRaw('🚫')).not.toThrow();
		expect(() => storage[name].setRaw('🚫', '')).not.toThrow();
		expect(() => storage[name].clear()).not.toThrow();
	});

	it.each([
		['strings', 'a string'],
		['empty strings', ''],
		['objects', { foo: 'bar' }],
		['arrays', [true, 2, 'bar']],
		['true booleans', true],
		['false booleans', false],
		['null', null],
	])('stores and retrieves %s', (type, data) => {
		implementation.set(type, data);
		expect(native.getItem(type)).toBe(`{"value":${JSON.stringify(data)}}`);
		expect(implementation.get(type)).toEqual(data);
	});

	it(`does not return a non-existing item`, () => {
		expect(implementation.get('thisDoesNotExist')).toBeNull();
	});

	it(`does not return an expired item with expiry as Date object`, () => {
		implementation.set('iAmExpired', 'data', new Date('1901-01-01'));
		expect(implementation.get('iAmExpired')).toBeNull();

		// check it's been deleted too
		expect(native.getItem('iAmExpired')).toBeNull();
	});

	it(`does not return an expired item with expiry as numeric value (millis since epoch)`, () => {
		implementation.set('iAmExpired', 'data', new Date('1901-01-01').getTime());
		expect(implementation.get('iAmExpired')).toBeNull();

		// check it's been deleted too
		expect(native.getItem('iAmExpired')).toBeNull();
	});

	it(`does not return an expired item with expiry as ISO date string`, () => {
		implementation.set('iAmExpired', 'data', '1901-01-01T00:00:00.000Z');
		expect(implementation.get('iAmExpired')).toBeNull();

		// check it's been deleted too
		expect(native.getItem('iAmExpired')).toBeNull();
	});

	it(`return null for a malformed item`, () => {
		native.setItem('malformed', '[]');
		expect(implementation.get('malformed')).toBeNull();
	});

	it(`returns a non-expired item`, () => {
		implementation.set('iAmNotExpired', 'data', new Date('2040-01-01'));
		expect(implementation.get('iAmNotExpired')).toBeTruthy();
	});

	it(`deletes items`, () => {
		native.setItem('deleteMe', 'please delete me');
		expect(native.getItem('deleteMe')).toBeTruthy();

		implementation.remove('deleteMe');
		expect(native.getItem('deleteMe')).toBeNull();
	});

	it(`clears all items`, () => {
		native.setItem('deleteMe', 'please delete me');
		native.setItem('deleteMe2', 'please delete me too');

		implementation.clear();

		expect(native.getItem('deleteMe')).toBeNull();
		expect(native.getItem('deleteMe2')).toBeNull();
	});

	it(`gets items in the raw`, async () => {
		native.setItem('raw item', '🦁');
		expect(implementation.getRaw('raw item')).toBe('🦁');
		expect(implementation.get('raw item')).toBeNull();

		setSpy.mockImplementation(functionThatThrowsAnError);
		getSpy.mockImplementation(functionThatThrowsAnError);

		// re-import now we've disabled native storage API
		const { storage } = await import('./storage');
		expect(storage[name].getRaw('raw item')).toBeNull();
	});

	it(`sets items in the raw`, () => {
		implementation.setRaw('raw item', '🦁');
		expect(native.getItem('raw item')).toBe('🦁');
	});

	it(`gets keys in storage by index`, async () => {
		expect(implementation.key(0)).toEqual(null);

		native.setItem('item 1', 'some val');
		native.setItem('item 2', 'some other val');
		/**
		 * The underlying native API doesn't guarantee order across different environments,
		 * so we can't know for sure which key we will retrieve.
		 */
		expect(['item 1', 'item 2']).toContain(implementation.key(0));

		native.removeItem('item 1');
		expect(implementation.key(0)).toEqual('item 2');

		setSpy.mockImplementation(functionThatThrowsAnError);
		getSpy.mockImplementation(functionThatThrowsAnError);

		// re-import now we've disabled native storage API
		const { storage } = await import('./storage');
		expect(storage[name].key(0)).toBeNull();
	});

	it(`returns the number of items in storage`, async () => {
		expect(implementation.length()).toEqual(0);

		native.setItem('item 1', 'some val');
		native.setItem('item 2', 'some other val');
		expect(implementation.length()).toEqual(2);

		native.removeItem('item 1');
		expect(implementation.length()).toEqual(1);

		setSpy.mockImplementation(functionThatThrowsAnError);
		getSpy.mockImplementation(functionThatThrowsAnError);

		// re-import now we've disabled native storage API
		const { storage } = await import('./storage');
		expect(storage[name].length()).toEqual(null);
	});
});
