import { ERR_INVALID_COOKIE } from './ERR_INVALID_COOKIE';
import { getCookieValues } from './getCookieValues';
import { getDomainAttribute } from './getDomainAttribute';
import { isValidCookie } from './isValidCookie';
import { memoizedCookies } from './memoizedCookies';
import { hasConsentForUseCase } from '@guardian/consent-management-platform';
import type { ConsentUseCases } from '@guardian/consent-management-platform/types/consentUseCases';

/**
 * Set a session cookie. If it's been memoized it will replace memoized value
 * @param details Details about the cookie.
 * @param details.name - the cookie’s name.
 * @param details.value - the cookie’s value.
 */

export const setSessionCookie = async ({
	useCase,
	name,
	value,
}: {
	useCase: ConsentUseCases;
	name: string;
	value: string;
}): Promise<void> => {
	if (
		useCase == 'No consent required' ||
		(await hasConsentForUseCase(useCase))
	) {
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
	}
};
