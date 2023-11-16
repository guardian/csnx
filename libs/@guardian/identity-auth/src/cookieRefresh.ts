import { getCookie, storage } from '@guardian/libs';
import type { IdentityAuthOptions, ProfileUrl } from './@types/OAuth';
import { isProfileUrl } from './@types/OAuth';
import { OAuthError } from './error';

// 30 days in milliseconds, used to determine if the lastRefresh value is older than 30 days.
const days30InMillis: number = 1000 * 60 * 60 * 24 * 30;

// redirect the user to the /signin/refresh endpoint which will refresh the okta session and GU_U cookie
// and then redirect the user back to the returnUrl, which should be the current page the user is on
const redirectToRefreshEndpoint = (
	profileUrl: ProfileUrl,
	returnUrl: string,
): void => {
	const endpoint = `${profileUrl}/signin/refresh?returnUrl=${returnUrl}`;
	window.location.replace(endpoint);
};

// check if the lastRefresh value is valid and is older than 30 days
const shouldRefreshCookie = (
	lastRefresh: unknown,
	currentTime: number,
): boolean => {
	// `!!Number()` returns `false` for `false`, `null`, `undefined`, `0`, and non-numeric strings.
	// We do this because `lastRefresh` can be any type or value and we only want to proceed with
	// the rest of the check if it's a number.
	const lastRefreshIsValid = !!Number(lastRefresh);
	if (!lastRefreshIsValid) {
		// We should refresh if we don't have a valid lastRefresh value.
		return true;
	}

	// We should refresh if the lastRefresh value is older than 30 days.
	return currentTime - Number(lastRefresh) > days30InMillis;
};

/**
 * @name cookieRefreshIfRequired
 * @description Refreshes the okta session and GU_U cookie if required, by redirecting the user to the /signin/refresh endpoint, if the GU_U cookie exists, and the lastRefresh value is invalid or older than 30 days
 * @param enabled - Determines if this feature is enabled
 * @param profileUrl - The profile URL of the Identity/Okta
 */
export const cookieRefreshIfRequired = (
	enabled: boolean,
	issuer: IdentityAuthOptions['issuer'],
): void => {
	const profileUrl = issuer.split('/oauth2')[0];

	if (!isProfileUrl(profileUrl)) {
		throw new OAuthError({
			error: 'invalid_issuer',
			error_description: `The issuer, ${issuer}, does not match the expected format.`,
		});
	}

	const lastRefreshKey = 'identity.lastRefresh';
	if (
		enabled &&
		storage.local.isAvailable() &&
		getCookie({ name: 'GU_U', shouldMemoize: true })
	) {
		const currentTime: number = new Date().getTime();
		// The storage API could return any type handled by JSON.parse, so
		// we will assume the type is 'unknown' and attempt to parse the value into
		// a number in the shouldRefreshCookie function.
		// storage.local.get will return null in two cases: if the key is missing,
		// or if the value has expired.
		const lastRefresh: unknown = storage.local.get(lastRefreshKey);
		if (shouldRefreshCookie(lastRefresh, currentTime)) {
			// Set the value in localStorage to expire in 30 days.
			const newExpiry = currentTime + days30InMillis;
			storage.local.set(lastRefreshKey, currentTime, newExpiry);
			// we only refresh the okta session and GU_U cookie, users with only an IDAPI session will
			// eventually be logged out by the IDAPI cookie expiry
			redirectToRefreshEndpoint(
				profileUrl,
				encodeURIComponent(document.location.href),
			);
		}
	}
};
