import { countries } from './countries.js';

describe('The countries object', () => {
	it('only contains unique country codes', () => {
		const codes = Object.values(countries).map((c) => c.countryCode);
		expect(codes.length).toBe(new Set(codes).size);
	});

	it('only contains unique country names', () => {
		const names = Object.values(countries).map((c) => c.name);
		expect(names.length).toBe(new Set(names).size);
	});

	it('contains exactly 249 countries', () => {
		// https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes#Current_ISO_3166_country_codes
		expect(Object.keys(countries).length).toBe(249);
	});
});
