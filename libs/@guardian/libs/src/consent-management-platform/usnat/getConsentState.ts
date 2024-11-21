import { type USNATConsentState } from '../types/usnat';
import { getGPPData } from './api';

const usnatStates = ['usnat', 'usca', 'usva', 'usco', 'usut', 'usct'];

const getSupportedAPIv1 = (
	supportedAPI: string | undefined,
): string | undefined => {
	if (supportedAPI && usnatStates.includes(supportedAPI)) {
		return supportedAPI.includes('v1') ? supportedAPI : `${supportedAPI}v1`;
	}
	return supportedAPI;
};

export const getConsentState: () => Promise<USNATConsentState> = async () => {
	let doNotSell = false; // Opt-Out
	const gppData = await getGPPData();

	const supportedAPI = gppData.supportedAPIs[0]?.split(':')[1]; // E.G: '7:usnatv1', '8:uscav1'
	// Temporary fix 21/11/2024
	const supportedAPIv1 = getSupportedAPIv1(supportedAPI);

	if (supportedAPIv1) {
		// https://github.com/InteractiveAdvertisingBureau/Global-Privacy-Platform/blob/main/Sections/US-National/IAB%20Privacy%E2%80%99s%20National%20Privacy%20Technical%20Specification.md
		// 0 Not Applicable. SharingOptOutNotice value was not applicable or no notice was provided, 1 Opted Out, 2 Did Not Opt Out
		doNotSell =
			gppData.parsedSections[supportedAPIv1]?.SaleOptOut !== 2 ||
			gppData.parsedSections[supportedAPIv1].Gpc;
	}

	return {
		doNotSell,
		signalStatus: gppData.signalStatus,
	};
};
