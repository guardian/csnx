import { getConsentOptOutStatus } from './getConsentOptOutStatus.ts';

describe('getConsentOptOutStatus', () => {
	it('returns correct status for US user opted out', () => {
		const consent = {
			usnat: { doNotSell: true },
		};
		expect(getConsentOptOutStatus(consent)).toBe(
			'You have opted out of the sale/sharing of personal information',
		);
	});

	it('returns correct status for US user not opted out', () => {
		const consent = {
			usnat: { doNotSell: false },
		};
		expect(getConsentOptOutStatus(consent)).toBe(
			'You have not opted out of the sale/sharing of personal information',
		);
	});

	it('returns correct status for undefined doNotSell', () => {
		const consent = {
			usnat: {},
		};
		expect(getConsentOptOutStatus(consent)).toBe(
			'You have not opted out of the sale/sharing of personal information',
		);
	});

	it('returns blank string for TCFv2', () => {
		const consent = {
			tcfv2: {},
		};
		expect(getConsentOptOutStatus(consent)).toBe('');
	});

	it('returns blank string for Australia', () => {
		const consent = {
			aus: { personalisedAdvertising: true },
		};
		expect(getConsentOptOutStatus(consent)).toBe('');
	});

	it('returns blank string for empty consent', () => {
		const consent = {};
		expect(getConsentOptOutStatus(consent)).toBe('');
	});
});
