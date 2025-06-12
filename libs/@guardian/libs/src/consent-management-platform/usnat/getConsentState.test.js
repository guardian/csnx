import usnatDataCanSell from './__fixtures__/api.getUserConsents.canSell.json';
import usnatDataDoNotSell from './__fixtures__/api.getUserConsents.doNotSell.json';
import { getUsnatData } from './api.ts';
import { getConsentState } from './getConsentState.ts';

jest.mock('./api');

describe('getConsentState', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it('gets the gpp consent state correctly - doNotSell is false', async () => {
		getUsnatData.mockResolvedValue(usnatDataCanSell);

		const { doNotSell } = await getConsentState();
		expect(getUsnatData).toHaveBeenCalledTimes(1);

		expect(doNotSell).toBe(false);
	});

	it('gets the gpp consent state correctly - doNotSell is true', async () => {
		getUsnatData.mockResolvedValue(usnatDataDoNotSell);

		const { doNotSell } = await getConsentState();

		expect(getUsnatData).toHaveBeenCalledTimes(1);
		expect(doNotSell).toBe(true);
	});

	it('gets the gpp consent state correctly if it fails - doNotSell is false', async () => {
		getUsnatData.mockResolvedValue({});

		const { doNotSell } = await getConsentState();

		expect(getUsnatData).toHaveBeenCalledTimes(1);
		expect(doNotSell).toBe(false);
	});

	it('should return false if the systemId is not set to 3 - doNotSell is false', async () => {
		let systemIdIncorrectlySet = usnatDataCanSell;
		systemIdIncorrectlySet = systemIdIncorrectlySet.categories.map(
			(category) => {
				category.systemId = 4;
				return category;
			},
		);
		getUsnatData.mockResolvedValue(systemIdIncorrectlySet);

		const { doNotSell } = await getConsentState();

		expect(getUsnatData).toHaveBeenCalledTimes(1);
		expect(doNotSell).toBe(false);
	});

	// xit('should return false if the supportedAPIs has an incorrect format  - doNotSell is false', async () => {
	// 	let applicableSectionsIncorrect = gppDataCanSell;
	// 	applicableSectionsIncorrect.applicableSections = [-1];
	// 	getGPPData.mockResolvedValue(applicableSectionsIncorrect);

	// 	const { doNotSell } = await getConsentState();

	// 	expect(getGPPData).toHaveBeenCalledTimes(1);
	// 	expect(doNotSell).toBe(false);
	// });

	// xit('should return false if supportedAPIs and parsedSections are different - doNotSell is false', async () => {
	// 	let supportedApiParsedSectionMismatch = gppDataCanSell;
	// 	supportedApiParsedSectionMismatch.supportedAPIs = ['7:usnat'];
	// 	getGPPData.mockResolvedValue(supportedApiParsedSectionMismatch);

	// 	const { doNotSell } = await getConsentState();

	// 	expect(getGPPData).toHaveBeenCalledTimes(1);
	// 	expect(doNotSell).toBe(false);
	// });

	// xit('should return false if the parsedSections is not correctly set - doNotSell is false', async () => {
	// 	let parsedSectionsIncorrect = gppDataCanSell;
	// 	parsedSectionsIncorrect.parsedSections = {};
	// 	getGPPData.mockResolvedValue(parsedSectionsIncorrect);

	// 	const { doNotSell } = await getConsentState();

	// 	expect(getGPPData).toHaveBeenCalledTimes(1);
	// 	expect(doNotSell).toBe(false);
	// });
});
