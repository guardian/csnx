import { isBoolean } from './isBoolean';

describe('isBoolean', () => {
	it('detects a boolean', () => {
		expect(isBoolean(true)).toBe(true);
		expect(isBoolean(false)).toBe(true);
	});

	it.each([
		'',
		null,
		undefined,
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
	])('%p is not a boolean', (value) => {
		expect(isBoolean(value)).toBe(false);
	});
});
