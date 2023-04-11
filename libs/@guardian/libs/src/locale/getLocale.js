import { getCookie } from '../cookies/getCookie.js';
import { setSessionCookie } from '../cookies/setSessionCookie.js';
import { isString } from '../isString/isString.js';
import { storage } from '../storage/storage.js';

/** @typedef {import('../countries/countries.js').CountryCode} CountryCode */

const KEY = 'GU_geo_country';
const KEY_OVERRIDE = 'gu.geo.override';
const URL = 'https://api.nextgen.guardianapps.co.uk/geolocation';
const COUNTRY_REGEX = /^[A-Z]{2}$/;

// best guess that we have a valid code, without actually shipping the entire list
/** @type {(country: unknown) => country is CountryCode} */
const isValidCountryCode = (country) =>
	isString(country) && COUNTRY_REGEX.test(country);

// we'll cache any successful lookups so we only have to do this once
/** @type {CountryCode | undefined} */
let locale;

// just used for tests
/** @type {() => void} */
export const __resetCachedValue = () => (locale = void 0);

/**
 * Fetches the user's current location as an ISO 3166-1 alpha-2 string e.g. 'GB', 'AU' etc
 * @returns {Promise<CountryCode | null>}
 */
export const getLocale = async () => {
	if (locale) return locale;
	// return overridden geo from localStorage, used for changing geo only for development purposes
	const geoOverride = storage.local.get(KEY_OVERRIDE);
	if (isValidCountryCode(geoOverride)) {
		return (locale = geoOverride);
	}

	// return locale from cookie if it exists
	const stored = getCookie({ name: 'GU_geo_country' });

	if (stored && isValidCountryCode(stored)) {
		return (locale = stored);
	}

	// use our API to get one
	try {
		const { country } = await fetch(URL).then((response) => response.json());
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
