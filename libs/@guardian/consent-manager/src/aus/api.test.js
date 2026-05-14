import { getGlobalEnterpriseConsents } from './api.ts';

jest.mock('../sourcepoint', () => ({
	sourcepointLibraryLoaded: Promise.resolve(),
}));

afterEach(() => {
	delete window._sp_;
});

it('returns default consents when window._sp_.globalcmp.getUserConsents is not available', async () => {
	const result = await getGlobalEnterpriseConsents();
	expect(result).toEqual({
		applies: false,
		categories: [],
		vendors: [],
		signalStatus: 'not ready',
	});
});

it('calls the globalcmp API with the correct callback', async () => {
	const mockConsent = {
		applies: true,
		categories: [{ _id: 'category1', systemId: 1, consented: true }],
		vendors: [{ _id: 'vendor1', consented: false }],
	};
	const mockGetUserConsents = jest.fn((callback) => {
		callback(mockConsent, true);
	});
	window._sp_ = {
		globalcmp: {
			getUserConsents: mockGetUserConsents,
		},
	};

	const result = await getGlobalEnterpriseConsents();
	expect(mockGetUserConsents).toHaveBeenCalledWith(expect.any(Function));
	expect(result).toEqual({
		...mockConsent,
		signalStatus: 'ready',
	});
});

it('rejects when getUserConsents returns success: false', async () => {
	const mockGetUserConsents = jest.fn((callback) => {
		callback({}, false);
	});
	window._sp_ = {
		globalcmp: {
			getUserConsents: mockGetUserConsents,
		},
	};
	await expect(getGlobalEnterpriseConsents()).rejects.toThrow(
		'Unable to get getGlobalEnterpriseConsents data',
	);
});
