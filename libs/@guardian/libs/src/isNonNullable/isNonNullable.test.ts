import { isNonNullable } from './isNonNullable.js';

describe('isUndefined', () => {
	it('detects a valid string', () => {
		let a: string | undefined = 'hello';
		expect(isNonNullable(a)).toBe(true);
		a = undefined;
		expect(isNonNullable(a)).toBe(false);
		a = 'world';
		expect(isNonNullable(a)).toBe(true);
	});

	it('Filters out null and undefined values', () => {
		const values = ['a', 'b', undefined, 'c', null, 'd', undefined, null];
		expect(isNonNullable(values)).toBe(true);
		const filtered = values.filter(isNonNullable);
		expect(filtered).toEqual(['a', 'b', 'c', 'd']);
	});
});
