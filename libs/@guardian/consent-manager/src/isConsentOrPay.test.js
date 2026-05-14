import {
	getConsentOrPayCurrency,
	isConsentOrPayCountry,
} from './isConsentOrPay.ts';

describe('isConsentOrPayCountry', () => {
	test('should return true if country code is FR', () => {
		expect(isConsentOrPayCountry('FR')).toBe(true);
	});

	test('should return true if country code is GB', () => {
		expect(isConsentOrPayCountry('GB')).toBe(true);
	});

	test('should return false if country code is NZ', () => {
		expect(isConsentOrPayCountry('NZ')).toBe(false);
	});
});

describe('getConsentOrPayCurrency', () => {
	test('should return GBP if country code is GB', () => {
		expect(getConsentOrPayCurrency('GB')).toBe('GBP');
	});

	test('should return EUR if country code is FR', () => {
		expect(getConsentOrPayCurrency('FR')).toBe('EUR');
	});

	test('should return GBP if country code is NZ (because this is the default currency if not a Consent or Pay country)', () => {
		expect(getConsentOrPayCurrency('NZ')).toBe('GBP');
	});
});
