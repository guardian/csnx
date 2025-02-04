import { isConsentOrPayCountry } from './isConsentOrPay.ts';

describe('isConsentOrPay', () => {
	test('should return false country code is FR', () => {
		expect(isConsentOrPayCountry('FR')).toBe(false);
	});

	test('should return true country code is GB', () => {
		expect(isConsentOrPayCountry('GB')).toBe(true);
	});
});
