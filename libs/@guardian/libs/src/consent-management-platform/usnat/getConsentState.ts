import { type USNATConsentState } from '../types/usnat';
import { getGPPData } from './api';

export const getConsentState: () => Promise<USNATConsentState> = async () => {
	let doNotSell = false; // Opt-Out
	const gppData = await getGPPData();

	// Get applicableSections
	const applicableSection = gppData.applicableSections[0]; // e.g. '7' for usnat

	// Find the supported API
	const supportedAPI = gppData.supportedAPIs.find((api) =>
		api.startsWith(`${String(applicableSection)}:`),
	); // Find string that contains the applicableSection i.e. (7) in '7:usnat'

	// Get parsedSections key and object
	const parsedSectionKey = supportedAPI
		? supportedAPI.split(':')[1]
		: undefined; // i.e. get 'usnat' from '7:usnat'

	const parsedSection = parsedSectionKey
		? gppData.parsedSections[parsedSectionKey]
		: undefined; // Get the gpp consent object with the key

	if (parsedSection) {
		// https://github.com/InteractiveAdvertisingBureau/Global-Privacy-Platform/blob/main/Sections/US-National/IAB%20Privacy%E2%80%99s%20National%20Privacy%20Technical%20Specification.md
		// 0 Not Applicable. SharingOptOutNotice value was not applicable or no notice was provided, 1 Opted Out, 2 Did Not Opt Out
		doNotSell = parsedSection.SaleOptOut !== 2 || parsedSection.Gpc;
	}

	return {
		doNotSell,
		signalStatus: gppData.signalStatus,
	};
};
