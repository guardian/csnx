import { getCookie } from '../cookies/getCookie';
import { PROPERTY_ID_MAIN, PROPERTY_ID_SUPPORT } from './lib/sourcepointConfig';
import type { SPUserConsent } from './types/tcfv2';

// https://sourcepoint-public-api.readme.io/reference/post_consent-v3-siteid-tcstring

export const mergeUserConsent = () => {
	const consentUUID = getCookie({ name: 'consentUUID' });
	const url = `https://cdn.privacy-mgmt.com/consent/tcfv2/consent/v3/${PROPERTY_ID_SUPPORT}/tcstring?consentUUID=${consentUUID}`;
	const spUserConsentString = localStorage.getItem(
		`_sp_user_consent_${PROPERTY_ID_MAIN}`,
	);
	const userConsent = JSON.parse(spUserConsentString ?? '{}') as SPUserConsent;

	fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			euconsent: userConsent.gdpr?.euconsent,
		}),
	}).catch((error) => {
		console.error('Error:', error);
	});
};
