import { isString } from './isString';

describe('isString', () => {
	it('detects a valid string', () => {
		expect(isString('hello')).toBe(true);
		expect(isString(new String())).toBe(true);
	});

	it.each([
		null,
		undefined,
		true,
		123,
		Symbol('Sym'),
		new Object(),
		[],
		new Map(),
		new Set(),
		new WeakMap(),
		new WeakSet(),
		new Date(),
		function () {
			return null;
		},
	])('%p is not a valid string', (value) => {
		expect(isString(value)).toBe(false);
	});
});
