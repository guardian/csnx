import { PROPERTY_ID_MAIN } from '../lib/sourcepointConfig.ts';
import { getUsnatData } from './api.ts';

describe('getUsnatData', () => {
	beforeEach(() => {
		localStorage.clear();
		delete window._sp_;
	});

	it('returns not ready when its not a CIPA state, the user has not actively consented and getUserConsents is not available', async () => {
		localStorage.setItem(
			`_sp_user_consent_${PROPERTY_ID_MAIN}`,
			JSON.stringify({
				usnat: {
					consentStatus: {
						hasConsentData: false,
					},
				},
			}),
		);
		window._sp_ = {
			config: {
				usnat: {
					targetingParams: {
						cipaBanner: false,
					},
				},
			},
		};
		const result = await getUsnatData();
		expect(result.applies).toBe(false);
		expect(result.categories).toEqual([]);
		expect(result.vendors).toEqual([]);
		expect(result.signalStatus).toEqual('not ready');
	});

	it('returns ready when its not a CIPA state, the user has not actively consented and getUserConsents is available', async () => {
		localStorage.setItem(
			`_sp_user_consent_${PROPERTY_ID_MAIN}`,
			JSON.stringify({
				usnat: {
					consentStatus: {
						hasConsentData: false,
					},
				},
			}),
		);
		window._sp_ = {
			config: {
				usnat: {
					targetingParams: {
						cipaBanner: false,
					},
				},
			},
			usnat: {
				getUserConsents: jest.fn((cb) => {
					cb({
						applies: true,
						categories: [],
						vendors: [],
						signalStatus: 'ready',
					});
				}),
			},
		};
		const result = await getUsnatData();
		expect(window._sp_.usnat.getUserConsents).toHaveBeenCalled();
		expect(result.applies).toBe(true);
		expect(result.categories).toEqual([]);
		expect(result.vendors).toEqual([]);
		expect(result.signalStatus).toEqual('ready');
	});

	it('returns not ready when it is a CIPA state, the user has not actively consented and getUserConsents is not available', async () => {
		localStorage.setItem(
			`_sp_user_consent_${PROPERTY_ID_MAIN}`,
			JSON.stringify({
				usnat: {
					consentStatus: {
						hasConsentData: false,
					},
				},
			}),
		);
		window._sp_ = {
			config: {
				usnat: {
					targetingParams: {
						cipaBanner: true,
					},
				},
			},
		};
		const result = await getUsnatData();
		expect(result.applies).toBe(false);
		expect(result.categories).toEqual([]);
		expect(result.vendors).toEqual([]);
		expect(result.signalStatus).toEqual('not ready');
	});

	it('returns not ready for an unconsented CIPA user even when getUserConsents is available', async () => {
		localStorage.setItem(
			`_sp_user_consent_${PROPERTY_ID_MAIN}`,
			JSON.stringify({
				usnat: {
					consentStatus: {
						hasConsentData: false,
					},
				},
			}),
		);
		window._sp_ = {
			config: {
				usnat: {
					targetingParams: {
						cipaBanner: true,
					},
				},
			},
			usnat: {
				getUserConsents: jest.fn((cb) => {
					cb({ applies: true, categories: [], vendors: [] });
				}),
			},
		};
		const result = await getUsnatData();
		expect(result.signalStatus).toEqual('not ready');
	});

	it('returns ready when it is a CIPA state, the user has not actively consented and getUserConsents is available', async () => {
		localStorage.setItem(
			`_sp_user_consent_${PROPERTY_ID_MAIN}`,
			JSON.stringify({
				usnat: {
					consentStatus: {
						hasConsentData: true,
					},
				},
			}),
		);
		window._sp_ = {
			config: {
				usnat: {
					targetingParams: {
						cipaBanner: true,
					},
				},
			},
			usnat: {
				getUserConsents: jest.fn((cb) => {
					cb({
						applies: true,
						categories: [],
						vendors: [],
						signalStatus: 'ready',
					});
				}),
			},
		};
		const result = await getUsnatData();
		expect(window._sp_.usnat.getUserConsents).toHaveBeenCalled();
		expect(result.applies).toBe(true);
		expect(result.categories).toEqual([]);
		expect(result.vendors).toEqual([]);
		expect(result.signalStatus).toEqual('ready');
	});
});
