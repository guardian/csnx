import { isExcludedFromCMP } from './routeExclusionList.ts';

describe('routeExclusionList', () => {
	it('isExcludedFromCMP', () => {
		expect(isExcludedFromCMP('info')).toBe(true);
	});
});
