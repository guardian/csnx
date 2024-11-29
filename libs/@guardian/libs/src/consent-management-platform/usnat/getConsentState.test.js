import gppDataCanSell from './__fixtures__/api.getGPPData.canSell.json';
import gppDataDoNotSell from './__fixtures__/api.getGPPData.doNotSell.json';
import gppDataFail from './__fixtures__/api.getGPPData.fail.json';
import { getGPPData } from './api.ts';
import { getConsentState } from './getConsentState.ts';

jest.mock('./api');

describe('getConsentState', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
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

	it('gets the gpp consent state correctly if it gpc is true - doNotSell is true', async () => {
		let gpcEnabled = gppDataCanSell;
		gpcEnabled.parsedSections.usnatv1.Gpc = true;

		getGPPData.mockResolvedValue(gpcEnabled);

		const { doNotSell } = await getConsentState();

		expect(getGPPData).toHaveBeenCalledTimes(1);
		expect(doNotSell).toBe(true);
	});

	it('gets the gpp consent state correctly if it fails - doNotSell is false', async () => {
		getGPPData.mockResolvedValue(gppDataFail);

		const { doNotSell } = await getConsentState();

		expect(getGPPData).toHaveBeenCalledTimes(1);
		expect(doNotSell).toBe(false);
	});

	it('should return false if the applicableSections is not correctly set - doNotSell is false', async () => {
		let applicableSectionsIncorrect = gppDataCanSell;
		applicableSectionsIncorrect.applicableSections = [-1];
		getGPPData.mockResolvedValue(applicableSectionsIncorrect);

		const { doNotSell } = await getConsentState();

		expect(getGPPData).toHaveBeenCalledTimes(1);
		expect(doNotSell).toBe(false);
	});

	it('should return false if the supportedAPIs has an incorrect format  - doNotSell is false', async () => {
		let applicableSectionsIncorrect = gppDataCanSell;
		applicableSectionsIncorrect.applicableSections = [-1];
		getGPPData.mockResolvedValue(applicableSectionsIncorrect);

		const { doNotSell } = await getConsentState();

		expect(getGPPData).toHaveBeenCalledTimes(1);
		expect(doNotSell).toBe(false);
	});

	it('should return false if supportedAPIs and parsedSections are different - doNotSell is false', async () => {
		let supportedApiParsedSectionMismatch = gppDataCanSell;
		supportedApiParsedSectionMismatch.supportedAPIs = ['7:usnat'];
		getGPPData.mockResolvedValue(supportedApiParsedSectionMismatch);

		const { doNotSell } = await getConsentState();

		expect(getGPPData).toHaveBeenCalledTimes(1);
		expect(doNotSell).toBe(false);
	});

	it('should return false if the parsedSections is not correctly set - doNotSell is false', async () => {
		let parsedSectionsIncorrect = gppDataCanSell;
		parsedSectionsIncorrect.parsedSections = {};
		getGPPData.mockResolvedValue(parsedSectionsIncorrect);

		const { doNotSell } = await getConsentState();

		expect(getGPPData).toHaveBeenCalledTimes(1);
		expect(doNotSell).toBe(false);
	});
});
