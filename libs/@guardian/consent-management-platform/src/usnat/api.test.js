import { getUsnatData } from './api.ts';

it('calls the correct Sourcepoint api with the correct methods', async () => {
	const usnatData = await getUsnatData();
	expect(usnatData.applies).toBe(false);
	expect(usnatData.categories).toEqual([]);
	expect(usnatData.vendors).toEqual([]);
	expect(usnatData.signalStatus).toEqual('not ready');

	window._sp_ = {
		usnat: {
			getUserConsents: jest.fn((cb) => {
				cb({});
			}),
		},
	};
	await getUsnatData();

	expect(window._sp_.usnat.getUserConsents).toHaveBeenCalled();
});
