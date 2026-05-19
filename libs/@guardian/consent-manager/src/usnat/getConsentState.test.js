import { jest } from '@jest/globals';
import usnatDataCanSell from './__fixtures__/api.getUserConsents.canSell.json' with { type: 'json' };
import usnatDataDoNotSell from './__fixtures__/api.getUserConsents.doNotSell.json' with { type: 'json' };

jest.unstable_mockModule('./api', () => ({
	getUsnatData: jest.fn(),
}));

const { getUsnatData } = await import('./api.ts');
const { getConsentState } = await import('./getConsentState.ts');

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
		getUsnatData.mockResolvedValue({
			applies: false,
			categories: [],
			vendors: [],
			signalStatus: 'not ready',
		});

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
});
