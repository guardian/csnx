import type { Country } from './@types/Country';
import type { CountryCode } from './@types/CountryCode';
import { countries } from './countries';

export const getCountryByCountryCodeCache: Partial<
	Record<CountryCode, Country>
> = {};

export const getCountryByCountryCode = (countryCode: CountryCode): Country =>
	(getCountryByCountryCodeCache[countryCode] ??= Object.values(countries).find(
		(country) => country.countryCode === countryCode,
	)) as Country;
