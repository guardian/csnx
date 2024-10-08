import { isGuardianDomain } from './domain';

export const ACCOUNT_ID = 1257;
export const PRIVACY_MANAGER_USNAT = 1068329;
export const PROPERTY_ID = 7417;
export const PROPERTY_ID_AUSTRALIA = 13348;
export const PRIVACY_MANAGER_TCFV2 = 106842;
export const PRIVACY_MANAGER_AUSTRALIA = 1178486;

export const ENDPOINT = isGuardianDomain()
	? 'https://sourcepoint.theguardian.com'
	: 'https://cdn.privacy-mgmt.com';
export type EndPoint = typeof ENDPOINT;
