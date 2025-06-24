import { isExcludedFromCMP } from './exclusionList.ts';

describe('isExcludedFromCMP', () => {
	test('should return false if empty', () => {
		expect(isExcludedFromCMP('')).toBe(false);
	});

	test('should return false if param not in sectionExclusionList', () => {
		expect(isExcludedFromCMP('foo')).toBe(false);
	});

	test('should return true if param in sectionExclusionList', () => {
		expect(isExcludedFromCMP('info')).toBe(true);
	});
});
