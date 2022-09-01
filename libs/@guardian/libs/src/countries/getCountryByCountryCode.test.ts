import { getCountryByCountryCode } from './getCountryByCountryCode';

describe('The getCountryByCountryCode', () => {
	it('returns a country object', () => {
		expect(getCountryByCountryCode('GB')).toEqual({
			name: 'United Kingdom of Great Britain and Northern Ireland',
			countryCode: 'GB',
		});
	});
});
