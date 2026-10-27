import { AB_TEST_US_STATES, isInUsStateForAbTest } from './usAbtest.ts';

const mockGetCookie = jest.fn();

jest.mock('@guardian/libs', () => ({
	getCookie: (...args) => mockGetCookie(...args),
}));

beforeEach(() => {
	mockGetCookie.mockReset();
});

describe('usAbtest', () => {
	const usStateInSupportedList = AB_TEST_US_STATES[0];

	describe('isInUsStateForAbTest', () => {
		it('returns true when the geo region cookie contains a supported US state', () => {
			mockGetCookie.mockReturnValue(`US-${usStateInSupportedList}`);
			expect(isInUsStateForAbTest()).toBe(true);
		});

		it('returns false when the geo region cookie contains an unsupported US state', () => {
			mockGetCookie.mockReturnValue('US-NY'); // NY is not in the supported list
			expect(isInUsStateForAbTest()).toBe(false);
		});

		it('returns false when the geo region cookie is for a non-US region', () => {
			mockGetCookie.mockReturnValue('GB-PNM'); // Non-US region
			expect(isInUsStateForAbTest()).toBe(false);
		});

		it('returns false when the geo region cookie is for a non-US region but with a state code that matches', () => {
			mockGetCookie.mockReturnValue('GB-WA'); // Non-US region with a state code that matches
			expect(isInUsStateForAbTest()).toBe(false);
		});

		it('returns false when the geo region cookie is null', () => {
			mockGetCookie.mockReturnValue(null);
			expect(isInUsStateForAbTest()).toBe(false);
		});
	});
});
