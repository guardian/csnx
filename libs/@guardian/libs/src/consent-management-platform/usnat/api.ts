import type { UsnatData } from '../types/usnat';

export const api = () =>
	new Promise((resolve, reject) => {
		if (window._sp_?.usnat?.getUserConsents) {
			window._sp_.usnat.getUserConsents((usNatData) => {
				return resolve({ ...usNatData, signalStatus: 'ready' });
			});
		} else {
			reject(new Error('No _sp_?.usnat?.getUserConsents found on window'));
		}
	});

export const getUsnatData = (): Promise<UsnatData> =>
	api() as Promise<UsnatData>;
