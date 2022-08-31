import type { Country } from './@types/Country';
import type { CountryCode } from './@types/CountryCode';
import { countries } from './countries';

export const getCountryByCountryCodeCache: {
	[prop in CountryCode]?: Country;
} = {};

export const getCountryByCountryCode = (countryCode: CountryCode): Country =>
	(getCountryByCountryCodeCache[countryCode] ||= Object.values(
		countries,
	).find((country) => country.countryCode === countryCode)) as Country;
