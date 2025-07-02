import { PRIVACY_CHOICE_ID_AUSTRALIA } from '../lib/sourcepointConfig.ts';
import { getGlobalEnterpriseConsents } from './api.ts';
import { getConsentState } from './getConsentState.ts';

jest.mock('./api');

const mockGlobalEnterpriseData = {
	applies: true,
	signalStatus: 'ready',
	categories: [
		{
			_id: PRIVACY_CHOICE_ID_AUSTRALIA,
			consented: true,
		},
	],
};

getGlobalEnterpriseConsents.mockResolvedValue(mockGlobalEnterpriseData);

describe('getConsentState', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('gets the consent state correctly when CMP applies and user consented', async () => {
		const { personalisedAdvertising, signalStatus } = await getConsentState();
		expect(getGlobalEnterpriseConsents).toHaveBeenCalledTimes(1);
		expect(personalisedAdvertising).toBe(true);
		expect(signalStatus).toBe('ready');
	});

	it('returns false for personalised advertising when CMP does not apply', async () => {
		getGlobalEnterpriseConsents.mockResolvedValueOnce({
			...mockGlobalEnterpriseData,
			applies: false,
		});

		const { personalisedAdvertising, signalStatus } = await getConsentState();
		expect(personalisedAdvertising).toBe(false);
		expect(signalStatus).toBe('not ready');
	});

	it('returns false for personalised advertising when category not found', async () => {
		getGlobalEnterpriseConsents.mockResolvedValueOnce({
			...mockGlobalEnterpriseData,
			categories: [],
		});

		const { personalisedAdvertising } = await getConsentState();
		expect(personalisedAdvertising).toBe(false);
	});

	it('returns false for personalised advertising when user has not consented', async () => {
		getGlobalEnterpriseConsents.mockResolvedValueOnce({
			...mockGlobalEnterpriseData,
			categories: [
				{
					_id: PRIVACY_CHOICE_ID_AUSTRALIA,
					consented: false,
				},
			],
		});

		const { personalisedAdvertising } = await getConsentState();
		expect(personalisedAdvertising).toBe(false);
	});
});
