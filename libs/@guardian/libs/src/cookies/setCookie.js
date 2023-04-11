import { ERR_INVALID_COOKIE } from './ERR_INVALID_COOKIE';
import { getCookieValues } from './getCookieValues';
import { getDomainAttribute } from './getDomainAttribute';
import { isValidCookie } from './isValidCookie';
import { memoizedCookies } from './memoizedCookies';

/**
 * Set a cookie. If it's been memoized it will replace it's memoized value
 * @param {object} details - Details about the cookie.
 * @param {string} details.name - the cookie’s name.
 * @param {string} details.value - the cookie’s value.
 * @param {number} [details.daysToLive] - optional expiry date will be calculated based on the daysToLive
 * @param {boolean} [details.isCrossSubdomain] - specify if it's a cross subdomain cookie, default false
 * @returns {void}
 */
export const setCookie = ({
	name,
	value,
	daysToLive,
	isCrossSubdomain = false,
}) => {
	const expires = new Date();

	if (!isValidCookie(name, value)) {
		throw new Error(`${ERR_INVALID_COOKIE} ${name}=${value}`);
	}

	if (daysToLive) {
		expires.setUTCDate(expires.getUTCDate() + daysToLive);
	} else {
		expires.setUTCMonth(expires.getUTCMonth() + 5);
		expires.setUTCDate(1);
	}

	document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()};${getDomainAttribute(
		{
			isCrossSubdomain,
		},
	)}`;

	// If the cookie is already memoized we want to replace its value
	if (memoizedCookies.has(name)) {
		const [value] = getCookieValues(name);
		if (value) {
			memoizedCookies.set(name, value);
		}
	}
};
