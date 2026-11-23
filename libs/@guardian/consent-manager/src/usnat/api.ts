import { PROPERTY_ID_MAIN } from '../lib/sourcepointConfig';
import type {
	SourcepointLocalStorageUSNATConsentState,
	UsnatData,
} from '../types/usnat';

const notReadyResponse = {
	applies: false,
	categories: [],
	vendors: [],
	signalStatus: 'not ready',
};
export const api = () =>
	new Promise((resolve) => {
		if (isCipaStateAndFirstLoad()) {
			resolve(notReadyResponse);
		}
		if (window._sp_?.usnat?.getUserConsents) {
			window._sp_.usnat.getUserConsents((usNatData) => {
				return resolve({ ...usNatData, signalStatus: 'ready' });
			});
		} else {
			resolve(notReadyResponse);
		}
	});

/**
 * checks if it is a CIPA state and if it is the first load (user has not actively consented)
 *
 * @return {*}  {boolean}
 */
const isCipaStateAndFirstLoad = (): boolean => {
	// If the user is not in a CIPA state, return false immediately.
	if (!window._sp_?.config.usnat?.targetingParams?.cipaBanner) {
		return false;
	}

	try {
		const storedUserConsent = localStorage.getItem(
			`_sp_user_consent_${PROPERTY_ID_MAIN}`,
		);
		if (!storedUserConsent) {
			return false;
		}

		const userConsent = JSON.parse(
			storedUserConsent,
		) as SourcepointLocalStorageUSNATConsentState;
		return !userConsent.usnat?.consentStatus?.hasConsentData;
	} catch {
		return false;
	}
};

export const getUsnatData = (): Promise<UsnatData> =>
	api() as Promise<UsnatData>;
