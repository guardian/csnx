import { isConsentOrPay } from './isConsentOrPay.ts';

describe('isConsentOrPay', () => {
	test('should return false country code is FR', () => {
		expect(isConsentOrPay('FR')).toBe(false);
	});

	test('should return true country code is GB', () => {
		expect(isConsentOrPay('GB')).toBe(true);
	});
});
