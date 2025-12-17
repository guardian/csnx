import { getGpcSignal } from '../lib/signals';
import { type USNATConsentState } from '../types/usnat';
import { getUsnatData } from './api';

export const getConsentState = async (): Promise<USNATConsentState> => {
	let doNotSell = false; // Opt-Out
	const usnatData = await getUsnatData();
	const saleCategory = usnatData.categories?.find((c) => c.systemId === 3);

	if (saleCategory?.consented === undefined) {
		// use value of GPC signal if consented is undefined
		doNotSell = getGpcSignal() === true;
	} else {
		// use explicit consent value
		doNotSell = !saleCategory.consented;
	}

	return {
		doNotSell,
		signalStatus: usnatData.signalStatus,
	};
};
