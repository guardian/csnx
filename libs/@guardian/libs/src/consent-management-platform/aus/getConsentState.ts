import { log } from '../../logger/logger';
import { PRIVACY_CHOICE_ID_AUSTRALIA } from '../lib/sourcepointConfig';
import type { AUSConsentState } from '../types/aus';
import { getGlobalEnterpriseConsents, getUSPData } from './api';

// get the current consent state using the official IAB method
export const oldGetConsentState: () => Promise<AUSConsentState> = async () => {
	const uspData = await getUSPData();

	// https://github.com/InteractiveAdvertisingBureau/CCPA-reference-code
	const optedOut = uspData.uspString.charAt(2) === 'Y';

	return {
		personalisedAdvertising: !optedOut,
		signalStatus: 'not ready',
	};
};

export const getConsentState: () => Promise<AUSConsentState> = async () => {
	const globalEnterpriseData = await getGlobalEnterpriseConsents();

	// If the CMP doesn't apply to this user, assume no consent
	if (!globalEnterpriseData.applies) {
		log('cmp', `Global Enterprise CMP does not apply to this user`);
		return {
			personalisedAdvertising: false,
			signalStatus: 'not ready',
		};
	}

	const personalizedAdCategory = globalEnterpriseData.categories.find(
		(category) => category._id === PRIVACY_CHOICE_ID_AUSTRALIA,
	);

	return {
		personalisedAdvertising: personalizedAdCategory?.consented ?? false,
		signalStatus: globalEnterpriseData.signalStatus,
	};
};
