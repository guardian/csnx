import { getCookieValues } from './getCookieValues';
import { memoizedCookies } from './memoizedCookies';

/**
 * Return a cookie. If it's been memoized it won't retrieve it again.
 * @param details Details about the cookie.
 * @param details.name - the cookie’s name.
 * @param details.shouldMemoize - set to true if you want to memoize it, default false.
 */

export const getCookie = ({
	name,
	shouldMemoize = false,
}: {
	name: string;
	shouldMemoize?: boolean;
}): string | null => {
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
