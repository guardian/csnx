import { countries } from './countries';

describe('The countries object', () => {
	it('only contains unique country codes', () => {
		const codes = Object.values(countries).map((c) => c.countryCode);
		expect(codes.length).toBe(new Set(codes).size);
	});

	it('only contains unique country names', () => {
		const names = Object.values(countries).map((c) => c.name);
		expect(names.length).toBe(new Set(names).size);
	});
});
