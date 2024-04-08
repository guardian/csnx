import type { CCPAConsentState } from '../types/ccpa';
import { getGPPData } from './api';

// get the current consent state using the official IAB method
export const getConsentState: () => Promise<CCPAConsentState> = async () => {
	const gppData = await getGPPData();

	return {
		doNotSell: gppData.parsedSections.usnatv1?.SaleOptOut !== 2,
	};
};
