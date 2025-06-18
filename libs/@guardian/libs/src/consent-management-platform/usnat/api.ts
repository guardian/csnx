import type { UsnatData } from '../types/usnat';

export const api = () =>
	new Promise((resolve) => {
		if (window._sp_?.usnat?.getUserConsents) {
			window._sp_.usnat.getUserConsents((usNatData) => {
				return resolve({ ...usNatData, signalStatus: 'ready' });
			});
		}
	});

export const getUsnatData = (): Promise<UsnatData> =>
	api() as Promise<UsnatData>;
