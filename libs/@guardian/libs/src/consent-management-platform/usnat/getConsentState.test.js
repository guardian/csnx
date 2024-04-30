import gppDataCanSell from './__fixtures__/api.getGPPData.canSell.json';
import gppDataDoNotSell from './__fixtures__/api.getGPPData.doNotSell.json';
import gppDataFail from './__fixtures__/api.getGPPData.fail.json';
import { getGPPData } from './api.ts';
import { getConsentState } from './getConsentState.ts';

jest.mock('./api');

describe('getConsentState', () => {
	it('gets the gpp consent state correctly - doNotSell is false', async () => {
		getGPPData.mockResolvedValue(gppDataCanSell);

		const { doNotSell } = await getConsentState();
		expect(getGPPData).toHaveBeenCalledTimes(1);

		expect(doNotSell).toBe(false);
	});

	it('gets the gpp consent state correctly - doNotSell is true', async () => {
		getGPPData.mockResolvedValue(gppDataDoNotSell);

		const { doNotSell } = await getConsentState();

		expect(getGPPData).toHaveBeenCalledTimes(1);
		expect(doNotSell).toBe(true);
	});

	it('gets the gpp consent state correctly if it fails - doNotSell is true', async () => {
		getGPPData.mockResolvedValue(gppDataFail);

		const { doNotSell } = await getConsentState();

		expect(getGPPData).toHaveBeenCalledTimes(1);
		expect(doNotSell).toBe(true);
	});
});
