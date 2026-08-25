import {
	getUsAbTestGroup,
	isInUsStateForAbTest,
	isUserInAbTest,
} from './usAbtest.ts';

const mockGetCookie = jest.fn();

jest.mock('@guardian/libs', () => ({
	getCookie: (...args) => mockGetCookie(...args),
}));

beforeEach(() => {
	mockGetCookie.mockReset();
});

describe('usAbtest', () => {
	const identityAndTrustConsentAbTestCookieName =
		'identity-and-trust-consent-rr-banner-us';
	const abTestCookieName = 'gu_client_ab_tests';
	const guCountryRegionCookieName = 'GU_geo_country_region';

	describe('isInUsStateForAbTest', () => {
		it('returns true when the geo region cookie contains a supported US state', () => {
			mockGetCookie.mockReturnValue('US-CA');
			expect(isInUsStateForAbTest()).toBe(true);
		});

		it('returns false when the geo region cookie contains an unsupported US state', () => {
			mockGetCookie.mockReturnValue('US-NY');
			expect(isInUsStateForAbTest()).toBe(false);
		});

		it('returns false when the geo region cookie is for a non-US region', () => {
			mockGetCookie.mockReturnValue('GB');
			expect(isInUsStateForAbTest()).toBe(false);
		});

		it('returns false when the geo region cookie is null', () => {
			mockGetCookie.mockReturnValue(null);
			expect(isInUsStateForAbTest()).toBe(false);
		});
	});

	describe('getUsAbTestGroup', () => {
		it('returns the test group when the ab test cookie contains a matching entry', () => {
			mockGetCookie.mockReturnValue(
				`${identityAndTrustConsentAbTestCookieName}:variant`,
			);
			expect(getUsAbTestGroup()).toBe('variant');
		});

		it('returns the correct group when the cookie contains multiple entries', () => {
			mockGetCookie.mockReturnValue(
				`some-other-test:variant,${identityAndTrustConsentAbTestCookieName}:control,another-test:variant`,
			);
			expect(getUsAbTestGroup()).toBe('control');
		});

		it('returns undefined when the ab test cookie does not contain a matching entry', () => {
			mockGetCookie.mockReturnValue('some-other-test:control');
			expect(getUsAbTestGroup()).toBeUndefined();
		});

		it('returns undefined when the ab test cookie is null', () => {
			mockGetCookie.mockReturnValue(null);
			expect(getUsAbTestGroup()).toBeUndefined();
		});
	});

	describe('isUserInAbTest', () => {
		it('returns true when the user is in a supported US state and is in the control ab test group', () => {
			mockGetCookie.mockImplementation(({ name }) => {
				if (name === guCountryRegionCookieName) {
					return 'US-CA';
				}
				if (name === abTestCookieName) {
					return `${identityAndTrustConsentAbTestCookieName}:control`;
				}
				return null;
			});
			expect(isUserInAbTest()).toBe(true);
		});

		it('returns true when the user is in a supported US state and is in the variant-1 ab test group', () => {
			mockGetCookie.mockImplementation(({ name }) => {
				if (name === guCountryRegionCookieName) {
					return 'US-CA';
				}
				if (name === abTestCookieName) {
					return `${identityAndTrustConsentAbTestCookieName}:variant-1`;
				}
				return null;
			});
			expect(isUserInAbTest()).toBe(true);
		});

		it('returns true when the user is in a supported US state and is in the variant-2 ab test group', () => {
			mockGetCookie.mockImplementation(({ name }) => {
				if (name === guCountryRegionCookieName) {
					return 'US-CA';
				}
				if (name === abTestCookieName) {
					return `${identityAndTrustConsentAbTestCookieName}:variant-2`;
				}
				return null;
			});
			expect(isUserInAbTest()).toBe(true);
		});

		it('returns false when the user is in a supported US state but has no ab test group', () => {
			mockGetCookie.mockImplementation(({ name }) => {
				if (name === guCountryRegionCookieName) {
					return 'US-CA';
				}
				if (name === abTestCookieName) {
					return 'some-other-test:control';
				}
				return null;
			});
			expect(isUserInAbTest()).toBe(false);
		});

		it('returns false when the user has an ab test group but is not in a supported US state', () => {
			mockGetCookie.mockImplementation(({ name }) => {
				if (name === guCountryRegionCookieName) {
					return 'US-NY';
				}
				if (name === abTestCookieName) {
					return `${identityAndTrustConsentAbTestCookieName}:variant`;
				}
				return null;
			});
			expect(isUserInAbTest()).toBe(false);
		});

		it('returns false when both cookies are absent', () => {
			mockGetCookie.mockReturnValue(null);
			expect(isUserInAbTest()).toBe(false);
		});
	});
});
