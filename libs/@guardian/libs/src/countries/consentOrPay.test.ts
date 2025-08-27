import { consentOrPayCurrencyMap, isConsentOrPayCountry } from './consentOrPay';

describe('isConsentOrPayCountry', () => {
	it('should return true for consent-or-pay countries', () => {
		expect(isConsentOrPayCountry('GB')).toBe(true);
		expect(isConsentOrPayCountry('DE')).toBe(true);
		expect(isConsentOrPayCountry('FR')).toBe(true);
	});

	it('should return false for non-consent-or-pay countries', () => {
		expect(isConsentOrPayCountry('US')).toBe(false);
		expect(isConsentOrPayCountry('CA')).toBe(false);
		expect(isConsentOrPayCountry('AU')).toBe(false);
	});
});

describe('consentOrPayCurrencyMap', () => {
	it('should return GBP for GB', () => {
		expect(consentOrPayCurrencyMap['GB']).toBe('GBP');
	});

	it('should return EUR for European countries', () => {
		expect(consentOrPayCurrencyMap['DE']).toBe('EUR');
		expect(consentOrPayCurrencyMap['FR']).toBe('EUR');
		expect(consentOrPayCurrencyMap['IT']).toBe('EUR');
	});

	it('should default to EUR for unknown countries', () => {
		expect(consentOrPayCurrencyMap['UNKNOWN']).toBe('EUR');
	});
});
