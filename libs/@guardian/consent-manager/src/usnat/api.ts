import { PROPERTY_ID_MAIN } from '../lib/sourcepointConfig';
import type { UsnatData } from '../types/usnat';

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
interface SPUSNATConsentState {
	usnat?: {
		consentStatus?: {
			hasConsentData?: boolean;
		};
	};
}
const isCipaStateAndFirstLoad = (): boolean => {
	const isCipaState =
		window._sp_?.config.usnat?.targetingParams?.cipaBanner ?? false;
	const storedUserConsent = localStorage.getItem(
		`_sp_user_consent_${PROPERTY_ID_MAIN}`,
	);
	if (!storedUserConsent) {
		return false;
	}
	const userConsent = JSON.parse(storedUserConsent) as SPUSNATConsentState;
	return isCipaState && !userConsent.usnat?.consentStatus?.hasConsentData;
};

export const getUsnatData = (): Promise<UsnatData> =>
	api() as Promise<UsnatData>;
