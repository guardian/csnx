import type { ConsentState, GetConsentFor } from './types';
import type { VendorName } from './vendors';
import { VendorIDs } from './vendors';

export const getConsentFor: GetConsentFor = (
	vendor: VendorName,
	consent: ConsentState,
): boolean => {
	const sourcepointIds = VendorIDs[vendor];

	if (
		typeof sourcepointIds === 'undefined' ||
		(Array.isArray(sourcepointIds) && sourcepointIds.length === 0)
	) {
		throw new Error(
			`Vendor '${vendor}' not found, or with no Sourcepoint ID. ` +
				'If it should be added, raise an issue at https://github.com/guardian/consent-management-platform/issues',
		);
	}

	if (consent.ccpa) {
		// doNotSell = false means we have consent
		return !consent.ccpa.doNotSell;
	}

	if (consent.aus) {
		// personalisedAdvertising = true means we have consent
		return consent.aus.personalisedAdvertising;
	}

	const foundSourcepointId = sourcepointIds.find(
		(id) => typeof consent.tcfv2?.vendorConsents[id] !== 'undefined',
	);

	if (typeof foundSourcepointId === 'undefined') {
		console.warn(
			`No consent returned from Sourcepoint for vendor: '${vendor}'`,
		);
		return false;
	}

	const tcfv2Consent: boolean | undefined =
		consent.tcfv2?.vendorConsents[foundSourcepointId];

	if (typeof tcfv2Consent === 'undefined') {
		console.warn(
			`No consent returned from Sourcepoint for vendor: '${vendor}'`,
		);
		return false;
	}

	return tcfv2Consent;
};
