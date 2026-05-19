import { jest } from '@jest/globals';
import customVendorConsents from './__fixtures__/api.getCustomVendorConsents.json' with { type: 'json' };
import tcData from './__fixtures__/api.getTCData.json' with { type: 'json' };

jest.unstable_mockModule('./api', () => ({
	getTCData: jest.fn(),
	getCustomVendorConsents: jest.fn(),
}));

const { getTCData, getCustomVendorConsents } = await import('./api.ts');
const { getConsentState } = await import('./getConsentState.ts');

getTCData.mockReturnValue(Promise.resolve(tcData));
getCustomVendorConsents.mockReturnValue(Promise.resolve(customVendorConsents));

describe('getConsentState', () => {
	it('gets the consent state correctly', async () => {
		tcData.purpose.consents['1'] = false;

		const {
			consents,
			eventStatus,
			vendorConsents,
			addtlConsent,
			gdprApplies,
			tcString,
		} = await getConsentState();

		expect(getTCData).toHaveBeenCalledTimes(1);
		expect(getCustomVendorConsents).toHaveBeenCalledTimes(1);

		expect(consents).toStrictEqual({
			1: false,
			2: true,
			3: true,
			4: true,
			5: true,
			6: true,
			7: true,
			8: true,
			9: true,
			10: true,
			11: true,
		});
		expect(eventStatus).toBe('tcloaded');
		expect(vendorConsents).toMatchSnapshot();
		expect(gdprApplies).toMatchSnapshot();
		expect(tcString).toMatchSnapshot();
		expect(addtlConsent).toMatchSnapshot();
	});
});
