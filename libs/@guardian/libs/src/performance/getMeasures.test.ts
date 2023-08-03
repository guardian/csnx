import { getMeasures } from './getMeasures';

describe('getMeasures', () => {
	it('returns an empty array when no measures are present', () => {
		expect(getMeasures(['dotcom'])).toEqual([]);
	});
});
