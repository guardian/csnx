import type { CountryCode } from '../index.test';
import { isGuardianDomain } from './lib/domain';
import { consentOrPayCountries } from './lib/sourcepointConfig';
import type { Currency } from './lib/sourcepointConfig';

let _isConsentOrPay = false;

export const setIsConsentOrPay = (isConsentOrPay: boolean) => {
	_isConsentOrPay = isConsentOrPay;
};

export const getIsConsentOrPay = (): boolean => {
	return _isConsentOrPay;
};

export const isConsentOrPayCountry = (countryCode: CountryCode) => {
	return countryCode in consentOrPayCountries;
};

export const getConsentOrPayCurrency = (countryCode: CountryCode): Currency => {
	if (!isConsentOrPayCountry(countryCode)) {
		return 'GBP';
	}
	return consentOrPayCountries[
		countryCode as keyof typeof consentOrPayCountries
	];
};

export const getSupportSignUpPage = (): string => {
	return isGuardianDomain()
		? `https://support.theguardian.com/guardian-ad-lite?returnAddress=${encodeURIComponent(window.location.href)}`
		: `https://support.code.dev-theguardian.com/guardian-ad-lite?returnAddress=${encodeURIComponent(window.location.href)}`;
};
