import { type USNATConsentState } from '../types/usnat';
import { getGPPData } from './api';

export const getConsentState: () => Promise<USNATConsentState> = async () => {
	let doNotSell = false; // Opt-Out
	const gppData = await getGPPData();
	const supportedAPI = gppData.parsedSections[0];

	if (supportedAPI) {
		// https://github.com/InteractiveAdvertisingBureau/Global-Privacy-Platform/blob/main/Sections/US-National/IAB%20Privacy%E2%80%99s%20National%20Privacy%20Technical%20Specification.md
		// 0 Not Applicable. SharingOptOutNotice value was not applicable or no notice was provided, 1 Opted Out, 2 Did Not Opt Out
		doNotSell = supportedAPI.SaleOptOut !== 2 || supportedAPI.Gpc;
	}

	return {
		doNotSell,
		signalStatus: gppData.signalStatus,
	};
};
