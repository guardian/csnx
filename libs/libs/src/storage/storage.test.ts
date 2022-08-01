import { storage } from './storage';

function functionThatThrowsAnError() {
	throw new Error('bang');
}

type StorageName = 'local' | 'session';
const LOCAL: StorageName = 'local';
const SESSION: StorageName = 'session';

describe.each([
	[LOCAL, storage[LOCAL], globalThis.localStorage],
	[SESSION, storage[SESSION], globalThis.sessionStorage],
])('storage.%s', (name, implementation, native) => {
	let getSpy: jest.SpyInstance;
	let setSpy: jest.SpyInstance;

	beforeEach(() => {
		getSpy = jest.spyOn(native.__proto__, 'getItem');
		setSpy = jest.spyOn(native.__proto__, 'setItem');
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
		expect(() => storage[name].set('🚫', true)).not.toThrowError();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return -- it's correct
		expect(() => storage[name].get('🚫')).not.toThrowError();
		expect(() => storage[name].remove('🚫')).not.toThrowError();
		expect(() => storage[name].getRaw('🚫')).not.toThrowError();
		expect(() => storage[name].setRaw('🚫', '')).not.toThrowError();
		expect(() => storage[name].clear()).not.toThrowError();
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

	it(`does not return an expired item`, () => {
		implementation.set('iAmExpired', 'data', new Date('1901-01-01'));
		expect(implementation.get('iAmExpired')).toBeNull();

		// check it's been deleted too
		expect(native.getItem('iAmExpired')).toBeNull();
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
});
