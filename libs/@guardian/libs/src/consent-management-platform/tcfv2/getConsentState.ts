import { getCurrentFramework } from '../getCurrentFramework';
import type { TCFv2ConsentList, TCFv2ConsentState } from '../types/tcfv2';
import { getCustomVendorConsents, getTCData } from './api';

const defaultConsents: TCFv2ConsentList = {
	'1': false,
	'2': false,
	'3': false,
	'4': false,
	'5': false,
	'6': false,
	'7': false,
	'8': false,
	'9': false,
	'10': false,
};

// get the current constent state using the official IAB method
export const getConsentState: () => Promise<TCFv2ConsentState> = async () => {
	const [tcData, customVendors] = await Promise.all([
		getTCData(),
		getCustomVendorConsents(),
	]);

	if (typeof tcData === 'undefined') {
		const currentFramework: string = getCurrentFramework() ?? 'undefined';
		throw new Error(
			`No TC Data found with current framework: ${currentFramework}`,
		);
	}
	const consents = {
		...defaultConsents,
		...tcData.purpose.consents,
	};

	const { eventStatus, gdprApplies, tcString, addtlConsent } = tcData;
	const { grants } = customVendors;

	const vendorConsents: TCFv2ConsentList = Object.keys(grants)
		.sort()
		.reduce((acc, cur) => ({ ...acc, [cur]: grants[cur]?.vendorGrant }), {});

	return {
		consents,
		eventStatus,
		vendorConsents,
		addtlConsent,
		gdprApplies,
		tcString,
	};
};
