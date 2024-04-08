import gppDataFail from './__fixtures__/api.getGPPData.fail.json';
import gppDataSuccess from './__fixtures__/api.getGPPData.success.json';
import { getGPPData } from './api.ts';
import { getConsentState } from './getConsentState.ts';

jest.mock('./api');
getGPPData.mockResolvedValue(gppDataSuccess);

describe('getConsentState', () => {
	it('gets the gpp consent state correctly', async () => {
		getGPPData.mockResolvedValue(gppDataSuccess);

		const { doNotSell } = await getConsentState();
		expect(getGPPData).toHaveBeenCalledTimes(1);

		expect(doNotSell).toBe(false);
	});

	it('gets the usp consent state correctly', async () => {
		getGPPData.mockResolvedValue(gppDataFail);

		const { doNotSell } = await getConsentState();

		expect(getGPPData).toHaveBeenCalledTimes(1);
		expect(doNotSell).toBe(true);
	});
});
