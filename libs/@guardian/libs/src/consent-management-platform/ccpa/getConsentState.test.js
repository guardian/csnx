import uspData from './__fixtures__/api.getUSPData.json';
import { getUSPData } from './api.ts';
import { getConsentState } from './getConsentState.ts';

jest.mock('./api');
getUSPData.mockResolvedValue(uspData);

describe('getConsentState', () => {
	it('gets the consent state correctly', async () => {
		const { doNotSell } = await getConsentState();

		expect(getUSPData).toHaveBeenCalledTimes(1);
		expect(doNotSell).toBe(true);
	});
});
