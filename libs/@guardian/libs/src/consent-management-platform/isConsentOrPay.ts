import type { ConsentOrPayCurrency } from '../countries/consentOrPay';
import {
	consentOrPayCurrencyMap,
	isConsentOrPayCountry,
} from '../countries/consentOrPay';
import type { CountryCode } from '../index.test';
import { isGuardianDomain } from './lib/domain';

// Re-export for backward compatibility
export { isConsentOrPayCountry };

let _isConsentOrPay = false;

export const setIsConsentOrPay = (isConsentOrPay: boolean) => {
	_isConsentOrPay = isConsentOrPay;
};

export const getIsConsentOrPay = (): boolean => {
	return _isConsentOrPay;
};

export const getConsentOrPayCurrency = (
	countryCode: CountryCode,
): ConsentOrPayCurrency => {
	if (!isConsentOrPayCountry(countryCode)) {
		return 'GBP';
	}
	return consentOrPayCurrencyMap[
		countryCode as keyof typeof consentOrPayCurrencyMap
	]!;
};

export const getSupportSignUpPage = (): string => {
	return isGuardianDomain()
		? `https://support.theguardian.com/guardian-ad-lite?returnAddress=${encodeURIComponent(window.location.href)}`
		: `https://support.code.dev-theguardian.com/guardian-ad-lite?returnAddress=${encodeURIComponent(window.location.href)}`;
};
