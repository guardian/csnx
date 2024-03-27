import customVendorConsents from './__fixtures__/api.getCustomVendorConsents.json';
import tcData from './__fixtures__/api.getTCData.json';
import { getCustomVendorConsents, getTCData } from './api.ts';
import { getConsentState } from './getConsentState.ts';

jest.mock('./api');
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
		});
		expect(eventStatus).toBe('tcloaded');
		expect(vendorConsents).toMatchSnapshot();
		expect(gdprApplies).toMatchSnapshot();
		expect(tcString).toMatchSnapshot();
		expect(addtlConsent).toMatchSnapshot();
	});
});
