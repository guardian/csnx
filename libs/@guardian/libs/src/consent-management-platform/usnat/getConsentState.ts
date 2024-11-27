import { type USNATConsentState } from '../types/usnat';
import { getGPPData } from './api';

export const getConsentState: () => Promise<USNATConsentState> = async () => {
	let doNotSell = false; // Opt-Out
	const gppData = await getGPPData();

	// Get applicableSections
	const applicableSections = gppData.applicableSections[0]; // i.e. 7 for usnat

	// Find the supported API
	const supportedAPI = gppData.supportedAPIs.find(
		(api) => applicableSections && api.includes(applicableSections.toString()),
	); // i.e. find string that contains the applicableSection (7)

	// Get parsedSections key and object
	const parsedSectionKey = supportedAPI ? supportedAPI.split(':')[1] : ''; // i.e. get 'usnat' from '7:usnat'
	const parsedSection =
		supportedAPI && parsedSectionKey
			? gppData.parsedSections[parsedSectionKey]
			: undefined; // get the object with the key of the supportedAPI

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
