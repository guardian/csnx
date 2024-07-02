import { getCookieValues } from './getCookieValues';
import { memoizedCookies } from './memoizedCookies';
import { hasConsentForUseCase } from '@guardian/consent-management-platform';
import type { ConsentUseCases } from '@guardian/consent-management-platform/types/consentUseCases';

/**
 * Return a cookie. If it's been memoized it won't retrieve it again.
 * @param useCase - the ConsentUseCase for which to get the data
 * @param details Details about the cookie.
 * @param details.name - the cookie’s name.
 * @param details.shouldMemoize - set to true if you want to memoize it, default false.
 */

export const setCookie = async ({
	useCase,
	name,
	shouldMemoize,
}: {
	useCase: ConsentUseCases;
	name: string;
	shouldMemoize?: boolean | undefined;
}): Promise<string | null> => {
	if (
		useCase == 'No consent required' ||
		(await hasConsentForUseCase(useCase))
	) {
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
	} else {
		return null;
	}
};
