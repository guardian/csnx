import { isUndefined } from './isUndefined';

let a: undefined;

describe('isUndefined', () => {
	it('detects a valid string', () => {
		expect(isUndefined(a)).toBe(true);
	});

	it.each([
		null,
		'hello',
		new String(),
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
	])('%p is not undefined', (value) => {
		expect(isUndefined(value)).toBe(false);
	});
});
