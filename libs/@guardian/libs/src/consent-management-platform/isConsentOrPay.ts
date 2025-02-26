import type { CountryCode } from '../index.test';
import { isGuardianDomain } from './lib/domain';
import { consentOrPayCountries } from './lib/sourcepointConfig';

let _isConsentOrPay = false;

export const setIsConsentOrPay = (isConsentOrPay: boolean) => {
	_isConsentOrPay = isConsentOrPay;
};

export const getIsConsentOrPay = (): boolean => {
	return _isConsentOrPay;
};

export const isConsentOrPayCountry = (countryCode: CountryCode) => {
	return consentOrPayCountries.includes(countryCode);
};

export const getSupportSignUpPage = (): string => {
	return isGuardianDomain()
		? `https://support.theguardian.com/guardian-ad-lite?returnAddress=${encodeURIComponent(window.location.href)}`
		: `https://support.code.dev-theguardian.com/guardian-ad-lite?returnAddress=${encodeURIComponent(window.location.href)}`;
};
