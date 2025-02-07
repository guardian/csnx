import { isGuardianDomain } from './domain';

export const ACCOUNT_ID = 1257;
export const PRIVACY_MANAGER_USNAT = 1068329;

export const PROPERTY_ID = 7417;
export const PROPERTY_ID_MAIN = 9398; // TO BE CHANGED
export const PROPERTY_ID_SUPPORT = 38161; // TO BE CHANGED
export const PROPERTY_ID_AUSTRALIA = 13348;

export const PROPERTY_HREF_SUBDOMAIN = 'http://subdomain.theguardian.com';
export const PROPERTY_HREF_MAIN = 'http://ui-dev';

export const PRIVACY_MANAGER_TCFV2 = 106842;
export const PRIVACY_MANAGER_TCFV2_CONSENT_OR_PAY = 1251121;
export const PRIVACY_MANAGER_AUSTRALIA = 1178486;

export const ENDPOINT = isGuardianDomain()
	? 'https://sourcepoint.theguardian.com'
	: 'https://cdn.privacy-mgmt.com';
export type EndPoint = typeof ENDPOINT;

// https://docs.sourcepoint.com/hc/en-us/articles/4405397484307-Event-callbacks-CMP#h_01FTY32EGZ7H3SS192MEE6SNCP
export const SourcePointChoiceTypes = {
	AcceptAll: 11,
	ManageCookies: 12,
	RejectAll: 13,
	Dismiss: 15,
} as const;
