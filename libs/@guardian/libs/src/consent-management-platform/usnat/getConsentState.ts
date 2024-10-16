import { type USNATConsentState } from '../types/usnat';
import { getGPPData } from './api';

export const getConsentState: () => Promise<USNATConsentState> = async () => {
	let doNotSell = false; // Opt-Out
	const gppData = await getGPPData();

	const supportedAPIs = gppData.supportedAPIs[0]?.split(':')[1]; // E.G: '7:usnatv1', '8:uscav1'

	if (supportedAPIs) {
		//0 Not Applicable. SharingOptOutNotice value was not applicable or no notice was provided, 1 Opted Out, 2 Did Not Opt Out
		doNotSell =
			gppData.parsedSections[supportedAPIs]?.SaleOptOut !== 2 ||
			gppData.parsedSections[supportedAPIs].Gpc;
		// https://github.com/InteractiveAdvertisingBureau/Global-Privacy-Platform/blob/main/Sections/US-National/IAB%20Privacy%E2%80%99s%20National%20Privacy%20Technical%20Specification.md
	}

	return {
		doNotSell,
		signalStatus: gppData.signalStatus,
	};
};
