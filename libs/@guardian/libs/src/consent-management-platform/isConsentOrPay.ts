import type { CountryCode } from '../index.test';

export const isConsentOrPay = (countryCode: CountryCode) => {
	const consentOrPayCountries = ['GB'];

	return consentOrPayCountries.includes(countryCode);
};
