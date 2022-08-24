import { ERR_INVALID_COOKIE } from './ERR_INVALID_COOKIE';
import { getCookieValues } from './getCookieValues';
import { getDomainAttribute } from './getDomainAttribute';
import { isValidCookie } from './isValidCookie';
import { memoizedCookies } from './memoizedCookies';

/**
 * Set a cookie. If it's been memoized it will replace it's memoized value
 * @param details Details about the cookie.
 * @param details.name - the cookie’s name.
 * @param details.value - the cookie’s value.
 * @param details.daysToLive - optional expiry date will be calculated based on the daysToLive
 * @param details.isCrossSubdomain - specify if it's a cross subdomain cookie, default false
 */

export const setCookie = ({
	name,
	value,
	daysToLive,
	isCrossSubdomain = false,
}: {
	name: string;
	value: string;
	daysToLive?: number;
	isCrossSubdomain?: boolean;
}): void => {
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
