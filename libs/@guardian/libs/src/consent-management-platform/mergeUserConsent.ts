import { getCookie } from '../cookies/getCookie';
import {
	PROPERTY_ID_MAIN,
	PROPERTY_ID_SUBDOMAIN,
} from './lib/sourcepointConfig';
import { postCustomConsent } from './tcfv2/api';
import type { SPUserConsent } from './types/tcfv2';

const purposeIdToNonAdvertisingPurposesMap = new Map<number, string>([
	[1, '677e3387b265dc07332909da'], // 1
	[2, '677e3386b265dc073328f686'], //2
	[3, '677e3386b265dc073328f96f'], // 3
	[4, '677e3386b265dc073328fc01'], //4
	[5, '677e3386b265dc073328fe72'], // 5
	[6, '677e3386b265dc073328ff70'], //6
	[7, '677e3386b265dc0733290050'], //7
	[8, '677e3386b265dc07332903c8'], //8
	[9, '677e3386b265dc0733290502'], //9
	[10, '677e3386b265dc073329071a'], //10
	[11, '677e3386b265dc07332909c2'], //11
]);

const spBaseUrl = 'https://cdn.privacy-mgmt.com/consent/tcfv2/consent/v3';
interface Vendors {
	_id: string;
	name: string;
	vendorType: string;
	googleId?: string;
}

interface LegIntCategories {
	_id: string;
	name: string;
	iabPurposeRef: {
		iabId: number;
		name: string;
	};
}
interface UserConsentStatus {
	vendors: Vendors[];
	legIntCategories: LegIntCategories[];
	legIntVendors: Vendors[];
	categories: LegIntCategories[];
}

/**
 * THis function gets the user's consent for the larger gdpr vendor list
 * then calls postUserConsent
 * https://sourcepoint-public-api.readme.io/reference/get_consent-v3-history-siteid-1
 */
export const mergeVendorList = async (): Promise<void> => {
	const userConsent = await getUserConsentOnAdvertisingList();
	await postUserConsent(userConsent);
	await mergeUserConsent();
	window.location.reload();
};

/**
 *
 *
 * @return {*}  {Promise<UserConsentStatus[]>}
 */
const getUserConsentOnAdvertisingList = async (): Promise<
	UserConsentStatus[]
> => {
	const consentUUID = getCookie({ name: 'consentUUID' });
	const url = `${spBaseUrl}/history/${PROPERTY_ID_MAIN}?consentUUID=${consentUUID}`;

	const getUserConsentOnAdvertisingListResponse = await fetch(url, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});

	return (await getUserConsentOnAdvertisingListResponse.json()) as UserConsentStatus[];
};

/**
 *
 *
 * @param {UserConsentStatus[]} data
 */
const postUserConsent = async (data: UserConsentStatus[]): Promise<void> => {
	const vendorIds = data[0]?.vendors.map((vendor) => vendor._id);
	let purposeIds = data[0]?.categories.map(
		(category) =>
			purposeIdToNonAdvertisingPurposesMap.get(category.iabPurposeRef.iabId) ??
			'',
	);
	let legitimateInterestPurposeIds = data[0]?.legIntCategories.map(
		(category) =>
			purposeIdToNonAdvertisingPurposesMap.get(category.iabPurposeRef.iabId) ??
			'',
	);

	purposeIds = purposeIds?.filter((id) => id !== '');
	legitimateInterestPurposeIds = legitimateInterestPurposeIds?.filter(
		(id) => id !== '',
	);

	if (vendorIds && purposeIds && legitimateInterestPurposeIds) {
		await postCustomConsent(
			vendorIds,
			purposeIds,
			legitimateInterestPurposeIds,
		);
	}
};

/**
 * This function merges the main vendor list with the sub-domain user consent status
 * https://sourcepoint-public-api.readme.io/reference/post_consent-v3-siteid-tcstring
 */
const mergeUserConsent = async (): Promise<void> => {
	const consentUUID = getCookie({ name: 'consentUUID' });
	const url = `${spBaseUrl}/${PROPERTY_ID_SUBDOMAIN}/tcstring?consentUUID=${consentUUID}`;
	const spUserConsentString = localStorage.getItem(
		`_sp_user_consent_${PROPERTY_ID_MAIN}`,
	);
	const userConsent = JSON.parse(spUserConsentString ?? '{}') as SPUserConsent;

	await fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			euconsent: userConsent.gdpr?.euconsent,
		}),
	});
};
