import { getCookie } from '../cookies/getCookie';
import type { ConsentState, OphanConsentDetails } from './types';

/**
 * This function generates the object to be sent to Ophan
 *
 * @param {ConsentState} consentState
 * @return {*}  {OphanConsentDetails}
 */
export const getConsentDetailsForOphan = (
	consentState: ConsentState,
): OphanConsentDetails => {
	if (consentState.tcfv2) {
		return {
			consentJurisdiction: 'TCF',
			consentUUID: getCookie({ name: 'consentUUID' }) ?? '',
			consent: consentState.tcfv2.tcString,
		};
	}

	if (consentState.usnat) {
		// Users who interacted with the CCPA banner before the migration to usnat will still have a ccpaUUID cookie.
		// The usnatUUID cookie is set when the USNAT banner is interacted with.
		// We need to check both cookies to ensure we have the correct consentUUID.
		const consentUUID =
			getCookie({ name: 'usnatUUID' }) ?? getCookie({ name: 'ccpaUUID' });
		return {
			consentJurisdiction: 'USNAT',
			consentUUID: consentUUID ?? '',
			consent: consentState.usnat.doNotSell ? 'false' : 'true',
		};
	}

	if (consentState.aus) {
		// Users who interacted with the CCPA banner before the migration to usnat will still have a ccpaUUID cookie.
		// The globalcmpUUID cookie is set when the AUS banner is interacted with.
		// We need to check both cookies to ensure we have the correct consentUUID.
		const consentUUID =
			getCookie({ name: 'globalcmpUUID' }) ?? getCookie({ name: 'ccpaUUID' });
		return {
			consentJurisdiction: 'AUS',
			consentUUID: consentUUID ?? '',
			consent: consentState.aus.personalisedAdvertising ? 'true' : 'false',
		};
	}

	return { consentJurisdiction: 'OTHER', consentUUID: '', consent: '' };
};
