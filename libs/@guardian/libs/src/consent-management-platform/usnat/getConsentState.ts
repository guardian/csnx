import { type USNATConsentState } from '../types/usnat';
import { getGPPData } from './api';

export const getConsentState: () => Promise<USNATConsentState> = async () => {
	let doNotSell = true;
	const gppData = await getGPPData();

	if (gppData.supportedAPIs.length === 0) {
		doNotSell = true;
	}

	const supportedAPIs = gppData.supportedAPIs[0]?.split(':')[1]; // E.G: '7:usnatv1', '8:uscav1'

	if (supportedAPIs) {
		doNotSell = gppData.parsedSections[supportedAPIs]?.SaleOptOut !== 2; // https://github.com/InteractiveAdvertisingBureau/Global-Privacy-Platform/blob/main/Sections/US-National/IAB%20Privacy%E2%80%99s%20National%20Privacy%20Technical%20Specification.md
	}

	return { doNotSell: doNotSell };
};
