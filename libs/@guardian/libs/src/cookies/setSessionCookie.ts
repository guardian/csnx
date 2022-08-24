import { ERR_INVALID_COOKIE } from './ERR_INVALID_COOKIE';
import { getCookieValues } from './getCookieValues';
import { getDomainAttribute } from './getDomainAttribute';
import { isValidCookie } from './isValidCookie';
import { memoizedCookies } from './memoizedCookies';

/**
 * Set a session cookie. If it's been memoized it will replace memoized value
 * @param details Details about the cookie.
 * @param details.name - the cookie’s name.
 * @param details.value - the cookie’s value.
 */

export const setSessionCookie = ({
	name,
	value,
}: {
	name: string;
	value: string;
}): void => {
	if (!isValidCookie(name, value)) {
		throw new Error(`${ERR_INVALID_COOKIE} ${name}=${value}`);
	}

	document.cookie = `${name}=${value}; path=/;${getDomainAttribute()}`;

	// If the cookie is already memoized we want to replace its value
	if (memoizedCookies.has(name)) {
		const [value] = getCookieValues(name);
		if (value) {
			memoizedCookies.set(name, value);
		}
	}
};
