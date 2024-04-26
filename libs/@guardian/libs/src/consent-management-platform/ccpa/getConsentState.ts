import type { CCPAConsentState } from '../types/ccpa';
// import { getUSPData } from './api';
import { getGPPData } from './api.ts';

// get the current consent state using the official IAB method
// export const getConsentState: () => Promise<CCPAConsentState> = async () => {
// 	const uspData = await getGPPData();

// 	return {
// 		doNotSell: uspData.uspString.charAt(2) === 'Y',
// 	};
// };

export const getConsentState: () => Promise<CCPAConsentState> = async () => {
	let doNotSell = true;
	const gppData = await getGPPData();

	if (gppData.supportedAPIs.length === 0) {
		doNotSell = true;
	}

	const supportedAPIs = gppData.supportedAPIs[0]?.split(':')[1]; // E.G: '7:usnatv1', '8:uscav1'

	if (supportedAPIs) {
		doNotSell = gppData.parsedSections[supportedAPIs]?.SaleOptOut !== 2; // https://github.com/InteractiveAdvertisingBureau/Global-Privacy-Platform/blob/main/Sections/US-National/IAB%20Privacy%E2%80%99s%20National%20Privacy%20Technical%20Specification.md
		//0 Not Applicable. SharingOptOutNotice value was not applicable or no notice was provided, 1 Opted Out, 2 Did Not Opt Out
	}

	return { doNotSell };
};
