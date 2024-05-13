import { getGPPData } from './api.ts';

it('calls the correct IAB api with the correct methods', async () => {
	expect(getGPPData()).rejects.toThrow();

	window.__gpp = jest.fn((a, cb) => {
		cb({}, true);
	});

	await getGPPData();

	expect(window.__gpp).toHaveBeenCalledWith('ping', expect.any(Function));
});
