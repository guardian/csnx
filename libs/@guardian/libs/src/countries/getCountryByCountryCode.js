import { countries } from './countries.js';

/** @typedef {import('./countries.js').Country} Country */
/** @typedef {import('./countries.js').CountryCode} CountryCode */

/** @type {{ [prop in CountryCode]?: Country }} */
export const getCountryByCountryCodeCache = {};

/** @type {Country} */
const fallback = {
	countryCode: 'GB',
	name: 'United Kingdom of Great Britain and Northern Ireland',
};

/** @type {(countryCode: CountryCode) => Country} */
export const getCountryByCountryCode = (countryCode) =>
	(getCountryByCountryCodeCache[countryCode] ||=
		Object.values(countries).find(
			(country) => country.countryCode === countryCode,
		) ?? fallback);
