import { getCookie } from '../cookies/getCookie';
import { setSessionCookie } from '../cookies/setSessionCookie';
import type { CountryCode } from '../countries/@types/CountryCode';
import { isString } from '../isString/isString';
import { storage } from '../storage/storage';

const KEY = 'GU_geo_country';
const KEY_OVERRIDE = 'gu.geo.override';
const URL = 'https://api.nextgen.guardianapps.co.uk/geolocation';
const COUNTRY_REGEX = /^[A-Z]{2}$/;

// best guess that we have a valid code, without actually shipping the entire list
const isValidCountryCode = (country: unknown) =>
	isString(country) && COUNTRY_REGEX.test(country);

// we'll cache any successful lookups so we only have to do this once
let locale: CountryCode | undefined;

// just used for tests
export const __resetCachedValue = (): void => (locale = void 0);

/**
 * Fetches the user's current location as an ISO 3166-1 alpha-2 string e.g. 'GB', 'AU' etc
 */

export const getLocale = async (): Promise<CountryCode | null> => {
	if (locale) return locale;

	// return overridden geo from localStorage, used for changing geo only for development purposes
	const geoOverride = storage.local.get(KEY_OVERRIDE) as CountryCode;

	if (isValidCountryCode(geoOverride)) {
		return (locale = geoOverride);
	}

	// return locale from cookie if it exists
	const stored = getCookie({ name: 'GU_geo_country' });

	if (stored && isValidCountryCode(stored)) {
		return (locale = stored as CountryCode);
	}

	// use our API to get one
	try {
		const { country } = (await fetch(URL).then((response) =>
			response.json(),
		)) as { country: CountryCode };

		if (isValidCountryCode(country)) {
			setSessionCookie({ name: KEY, value: country });

			// return it
			return (locale = country);
		}
	} catch (e) {
		// do nothing
	}

	return null;
};
