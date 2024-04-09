import type { USNATConsentState } from '../types/usnat';
import { getGPPData } from './api';

// get the current consent state using the official IAB method
export const getConsentState: () => Promise<USNATConsentState> = async () => {
	const gppData = await getGPPData();

	return {
		// https://github.com/InteractiveAdvertisingBureau/Global-Privacy-Platform/blob/main/Sections/US-National/IAB%20Privacy%E2%80%99s%20National%20Privacy%20Technical%20Specification.md
		doNotSell: gppData.parsedSections.usnatv1?.SaleOptOut !== 2,
	};
};
