import { isObject } from './isObject';

describe('isObject', () => {
	it('detects a valid object', () => {
		expect(isObject({})).toBe(true);
		expect(isObject(new Object())).toBe(true);
	});

	it.each([
		null,
		undefined,
		true,
		123,
		Symbol('Sym'),
		new String(),
		'',
		[],
		new Map(),
		new Set(),
		new WeakMap(),
		new WeakSet(),
		new Date(),
		function () {
			return null;
		},
	])('%p is not a valid object', (value) => {
		expect(isObject(value)).toBe(false);
	});
});
