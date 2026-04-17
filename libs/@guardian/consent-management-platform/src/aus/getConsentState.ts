import { PRIVACY_CHOICE_ID_AUSTRALIA } from '../lib/sourcepointConfig';
import type { AUSConsentState } from '../types/aus';
import { getGlobalEnterpriseConsents } from './api';

export const getConsentState: () => Promise<AUSConsentState> = async () => {
	const globalEnterpriseData = await getGlobalEnterpriseConsents();

	const personalizedAdCategory = globalEnterpriseData.categories.find(
		(category) => category._id === PRIVACY_CHOICE_ID_AUSTRALIA,
	);

	return {
		personalisedAdvertising: personalizedAdCategory?.consented ?? false,
		signalStatus: globalEnterpriseData.signalStatus,
	};
};
