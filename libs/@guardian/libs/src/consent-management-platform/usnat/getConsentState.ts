import { type USNATConsentState } from '../types/usnat';
import { getUsnatData } from './api';

export const getConsentState = async (): Promise<USNATConsentState> => {
	let doNotSell = false; // Opt-Out
	const usnatData = await getUsnatData();

	doNotSell =
		usnatData.categories?.find((category) => category.systemId === 3)
			?.consented === false; //check for sale or share consent https://sourcepoint-public-api.readme.io/reference/reference-systemid-for-iab-privacy-choices

	return {
		doNotSell,
		signalStatus: usnatData.signalStatus,
	};
};
