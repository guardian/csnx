import { getShortDomain } from './getShortDomain';

/**
 * Removes a cookie.
 * @param details Details about the cookie.
 * @param details.name - the cookie’s name.
 * @param details.currentDomainOnly - set to true if it's only for current domain
 */

export const removeCookie = ({
	name,
	currentDomainOnly = false,
}: {
	name: string;
	currentDomainOnly?: boolean;
}): void => {
	const expires = 'expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	const path = 'path=/;';

	// Remove cookie, implicitly using the document's domain.
	document.cookie = `${name}=;${path}${expires}`;
	if (!currentDomainOnly) {
		// also remove from the short domain
		document.cookie = `${name}=;${path}${expires} domain=${getShortDomain()};`;
	}
};
