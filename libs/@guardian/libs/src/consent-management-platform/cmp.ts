import type { CountryCode } from '../index.test';
import { getCurrentFramework } from './getCurrentFramework';
import { getIsConsentOrPay } from './isConsentOrPay';
import { mark } from './lib/mark';
import {
	PRIVACY_MANAGER_AUSTRALIA,
	PRIVACY_MANAGER_TCFV2,
	PRIVACY_MANAGER_TCFV2_CONSENT_OR_PAY,
	PRIVACY_MANAGER_USNAT,
} from './lib/sourcepointConfig';
import {
	init as initSourcepoint,
	willShowPrivacyMessage as sourcepointWillShowPrivacyMessage,
} from './sourcepoint';
import type {
	ConsentFramework,
	PubData,
	SourcepointImplementation,
	WillShowPrivacyMessage,
} from './types';

const init = (
	framework: ConsentFramework,
	countryCode: CountryCode,
	isUserSignedIn: boolean,
	useNonAdvertisedList: boolean,
	pubData?: PubData,
	isInSourcepointGeolocationTest = false,
): void => {
	mark('cmp-init');
	initSourcepoint(
		framework,
		countryCode,
		isUserSignedIn,
		useNonAdvertisedList,
		pubData,
		isInSourcepointGeolocationTest,
	);
};

const willShowPrivacyMessage: WillShowPrivacyMessage = () =>
	sourcepointWillShowPrivacyMessage;

function showPrivacyManager(): void {
	switch (getCurrentFramework()) {
		case 'tcfv2':
			window._sp_?.gdpr?.loadPrivacyManagerModal?.(
				getIsConsentOrPay()
					? PRIVACY_MANAGER_TCFV2_CONSENT_OR_PAY
					: PRIVACY_MANAGER_TCFV2,
			);
			break;
		case 'usnat':
			window._sp_?.usnat?.loadPrivacyManagerModal?.(PRIVACY_MANAGER_USNAT);
			break;
		case 'aus':
			window._sp_?.ccpa?.loadPrivacyManagerModal?.(PRIVACY_MANAGER_AUSTRALIA);
			break;
	}
}

export const CMP: SourcepointImplementation = {
	init,
	willShowPrivacyMessage,
	showPrivacyManager,
};
