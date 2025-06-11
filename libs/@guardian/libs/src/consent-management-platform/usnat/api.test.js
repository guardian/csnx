import { getUsnatData } from './api.ts';

it('calls the correct Sourcepoint api with the correct methods', async () => {
	expect(getUsnatData()).rejects.toThrow();

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
