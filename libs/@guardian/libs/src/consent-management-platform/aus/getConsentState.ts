import { log } from '../../logger/logger';
import type { AUSConsentState } from '../types/aus';
import { getGlobalEnterpriseConsents, getUSPData } from './api';

// get the current consent state using the official IAB method
export const oldGetConsentState: () => Promise<AUSConsentState> = async () => {
	const uspData = await getUSPData();

	// https://github.com/InteractiveAdvertisingBureau/CCPA-reference-code
	const optedOut = uspData.uspString.charAt(2) === 'Y';

	return {
		personalisedAdvertising: !optedOut,
	};
};

export const getConsentState: () => Promise<AUSConsentState> = async () => {
	const globalEnterpriseData = await getGlobalEnterpriseConsents();

	// If the CMP doesn't apply to this user, assume no consent
	if (!globalEnterpriseData.applies) {
		log('cmp', `Global Enterprise CMP does not apply to this user`);
		return {
			personalisedAdvertising: false,
		};
	}

	const personalizedAdCategory = globalEnterpriseData.categories.find(
		(category) => category._id === '685d16549dd54334f95e2b05', // *** DOUBLE-CHECK WITH JOSIE
	);

	// // https://sourcepoint-public-api.readme.io/reference/reference-systemid-for-iab-privacy-choices
	// const personalizedAdCategory = globalEnterpriseData.categories.find(
	//     category => category.systemId === 3 // *** DOUBLE-CHECK WITH JOSIE
	// );

	return {
		personalisedAdvertising: personalizedAdCategory?.consented ?? false,
	};
};
