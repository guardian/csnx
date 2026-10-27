import { CIPA_US_STATES, isInUsStateForCipaBanner } from './geo.ts';

const mockGetCookie = jest.fn();

jest.mock('@guardian/libs', () => ({
	getCookie: (...args) => mockGetCookie(...args),
}));

beforeEach(() => {
	mockGetCookie.mockReset();
});

describe('usCipaBanner', () => {
	const usStateInSupportedList = CIPA_US_STATES[0];

	describe('isInUsStateForCipaBanner', () => {
		it('returns true when the geo region cookie contains a supported US state', () => {
			mockGetCookie.mockReturnValue(`US-${usStateInSupportedList}`);
			expect(isInUsStateForCipaBanner()).toBe(true);
		});

		it('returns false when the geo region cookie contains an unsupported US state', () => {
			mockGetCookie.mockReturnValue('US-NY'); // NY is not in the supported list
			expect(isInUsStateForCipaBanner()).toBe(false);
		});

		it('returns false when the geo region cookie is for a non-US region', () => {
			mockGetCookie.mockReturnValue('GB-PNM'); // Non-US region
			expect(isInUsStateForCipaBanner()).toBe(false);
		});

		it('returns false when the geo region cookie is for a non-US region but with a state code that matches', () => {
			mockGetCookie.mockReturnValue('GB-WA'); // Non-US region with a state code that matches
			expect(isInUsStateForCipaBanner()).toBe(false);
		});

		it('returns false when the geo region cookie is null', () => {
			mockGetCookie.mockReturnValue(null);
			expect(isInUsStateForCipaBanner()).toBe(false);
		});
	});
});
