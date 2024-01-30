import { isGuardianDomain } from './domain';

export const ACCOUNT_ID = 1257;
export const PRIVACY_MANAGER_CCPA = 540252;
export const PRIVACY_MANAGER_TCFV2 = 106842;
export const PRIVACY_MANAGER_AUSTRALIA = 540341;

export const ENDPOINT = isGuardianDomain()
	? 'https://sourcepoint.theguardian.com'
	: 'https://cdn.privacy-mgmt.com';
export type EndPoint = typeof ENDPOINT;
