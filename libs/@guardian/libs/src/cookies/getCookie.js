import { getCookieValues } from './getCookieValues';
import { memoizedCookies } from './memoizedCookies';

/**
 * Return a cookie. If it's been memoized it won't retrieve it again.
 * @param {object} details Details about the cookie.
 * @param {string} details.name - the cookie’s name.
 * @param {boolean} [details.shouldMemoize] - set to true if you want to memoize it, default false.
 * @returns {string | null}
 */

export const getCookie = ({ name, shouldMemoize = false }) => {
	const memoizedCookie = memoizedCookies.get(name);
	if (memoizedCookie) return memoizedCookie;

	const [value] = getCookieValues(name);

	if (value) {
		if (shouldMemoize) {
			memoizedCookies.set(name, value);
		}
		return value;
	}
	return null;
};
