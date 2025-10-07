import { isGuardianDomain } from './domain';

export const ACCOUNT_ID = 1257;
export const PRIVACY_MANAGER_USNAT = 1068329;

export const PROPERTY_ID_MAIN = 7417;
export const PROPERTY_ID_SUBDOMAIN = 38161;
export const PROPERTY_ID_AUSTRALIA = 13348;

export const PROPERTY_HREF_SUBDOMAIN = 'https://subdomain.theguardian.com';
export const PROPERTY_HREF_MAIN = 'https://test.theguardian.com';

export const PRIVACY_MANAGER_TCFV2 = 106842;
export const PRIVACY_MANAGER_TCFV2_CONSENT_OR_PAY = 1263449;
export const PRIVACY_MANAGER_AUSTRALIA = 1349649;

export const PRIVACY_CHOICE_ID_AUSTRALIA = '685d16549dd54334f95e2b05';

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

export type Currency = 'GBP' | 'EUR';

// Consent or Pay countries with their respective currencies
export const consentOrPayCountries = {
	GB: 'GBP', // United Kingdom
	JE: 'GBP', // Jersey
	GG: 'GBP', // Guernsey
	IM: 'GBP', // Isle of Man
	GI: 'GBP', // Gibraltar
	AT: 'EUR', // Austria
	BE: 'EUR', // Belgium
	BG: 'EUR', // Bulgaria
	HR: 'EUR', // Croatia
	CY: 'EUR', // Cyprus
	CZ: 'EUR', // Czech Republic
	DK: 'EUR', // Denmark
	EE: 'EUR', // Estonia
	FI: 'EUR', // Finland
	FR: 'EUR', // France
	DE: 'EUR', // Germany
	GR: 'EUR', // Greece
	HU: 'EUR', // Hungary
	IS: 'EUR', // Iceland
	IE: 'EUR', // Ireland
	IT: 'EUR', // Italy
	LV: 'EUR', // Latvia
	LT: 'EUR', // Lithuania
	LU: 'EUR', // Luxembourg
	MT: 'EUR', // Malta
	NL: 'EUR', // Netherlands
	NO: 'EUR', // Norway
	PL: 'EUR', // Poland
	PT: 'EUR', // Portugal
	RO: 'EUR', // Romania
	SK: 'EUR', // Slovakia
	SI: 'EUR', // Slovenia
	ES: 'EUR', // Spain
	SE: 'EUR', // Sweden
	CH: 'EUR', // Switzerland
} as const satisfies Record<string, Currency>;
