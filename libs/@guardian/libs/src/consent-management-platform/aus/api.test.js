import { getUSPData } from './api.ts';

jest.mock('../sourcepoint', () => ({
	sourcepointLibraryLoaded: Promise.resolve(),
}));

it('throws an error on missing window.__uspapi', async () => {
	await expect(getUSPData()).rejects.toThrow('No __uspapi found on window');
});

it('calls the modified IAB api with the correct methods', async () => {
	window.__uspapi = jest.fn((a, b, cb) => {
		cb({}, true);
	});

	await getUSPData();

	expect(window.__uspapi).toHaveBeenCalledWith(
		'getUSPData',
		expect.any(Number),
		expect.any(Function),
	);
});
