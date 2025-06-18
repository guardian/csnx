import type { UsnatData } from '../types/usnat';

export const api = () =>
	new Promise((resolve, reject) => {
		if (window._sp_?.usnat?.getUserConsents) {
			window._sp_.usnat.getUserConsents((usNatData) => {
				return resolve({ ...usNatData, signalStatus: 'ready' });
			});
		} else {
			return reject(
				new Error('window._sp_.usnat.getUserConsents is not available.'),
			);
		}
	});

export const getUsnatData = (): Promise<UsnatData> =>
	api() as Promise<UsnatData>;
