import { removeCookie } from '../cookies/removeCookie';
import { storage } from '../storage/storage';
import { getConsentFor } from './getConsentFor';
import { onConsentChange } from './onConsentChange';
import type { ConsentState } from './types';
import type { VendorData, VendorWithData } from './vendorStorageIds';
import {
	deprecatedVendorStorageIds,
	vendorStorageIds,
} from './vendorStorageIds';

const removeData = (vendorData: VendorData): void => {
	if ('cookies' in vendorData) {
		vendorData.cookies?.forEach((name) => {
			removeCookie({ name });
		});
	}
	if ('localStorage' in vendorData) {
		vendorData.localStorage?.forEach((name) => {
			storage.local.remove(name);
		});
	}
	if ('sessionStorage' in vendorData) {
		vendorData.sessionStorage?.forEach((name) => {
			storage.session.remove(name);
		});
	}
};

const removeUnconsentedData = (consent: ConsentState) => {
	(<VendorWithData[]>Object.keys(vendorStorageIds)).forEach((vendor) => {
		const consentForVendor = getConsentFor(vendor, consent);
		const vendorData = vendorStorageIds[vendor];
		if (!consentForVendor) {
			removeData(vendorData);
		}
	});
	Object.entries(deprecatedVendorStorageIds).forEach(([, vendorData]) =>
		removeData(vendorData),
	);
};

/**
 * This function is called when the CMP is initialised. It listens for consent changes and removes cookies and localStorage data for vendors that the user has not consented to.
 */
export const initVendorDataManager = (): void => {
	onConsentChange((consent) => {
		if ('requestIdleCallback' in window) {
			requestIdleCallback(
				() => {
					removeUnconsentedData(consent);
				},
				{
					timeout: 2000,
				},
			);
		} else {
			removeUnconsentedData(consent);
		}
	});
};
