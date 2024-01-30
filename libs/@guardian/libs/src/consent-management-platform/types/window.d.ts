import type { getConsentFor } from '../getConsentFor';
import type { Property } from '../lib/property';
import type { EndPoint } from '../lib/sourcepointConfig';
import type { onConsent } from '../onConsent';
import type { onConsentChange } from '../onConsentChange';
import type { CCPAData } from './ccpa';
import type { TCData } from './tcfv2/TCData';
import type { CMP, Framework, PubData } from '.';

type OnMessageChoiceSelect = (
	message_type: string,
	choice_id: number,
	choiceTypeID: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 9 | 10 | 11 | 12 | 13 | 14 | 15,
) => void;

declare global {
	interface Window {
		// *************** START commercial.dcr.js hotfix ***************
		guCmpHotFix: {
			initialised?: boolean;
			cmp?: CMP;
			onConsent?: typeof onConsent;
			onConsentChange?: typeof onConsentChange;
			getConsentFor?: typeof getConsentFor;
		};
		// *************** END commercial.dcr.js hotfix ***************
		_sp_queue: [];
		_sp_?: {
			config: {
				baseEndpoint: EndPoint;
				accountId: number;
				propertyHref: Property;
				propertyId?: string;
				targetingParams: {
					framework: Framework;
				};
				ccpa?: {
					targetingParams?: {
						framework: Framework;
					};
				};
				gdpr?: {
					targetingParams?: {
						framework: Framework;
					};
				};
				pubData: PubData;
				events?: {
					onMessageReceiveData: (
						message_type: string,
						data: {
							messageId: 0 | string;
						},
					) => void;
					onConsentReady: (
						message_type: string,
						consentUUID: string,
						euconsent: string,
					) => void;
					onMessageReady: (message_type: string) => void;
					onMessageChoiceSelect: OnMessageChoiceSelect;
					onPrivacyManagerAction: (
						message_type: string,
						pmData: string,
					) => void;
					onMessageChoiceError: (
						message_type: string,
						err: string,
					) => void;
					onPMCancel: (message_type: string) => void;
					onSPPMObjectReady: () => void;
					onError: (
						message_type: string,
						errorCode: string,
						errorObject: string,
						userReset: string,
					) => void;
				};
			};
			gdpr?: {
				loadPrivacyManagerModal?: (id: number) => void;
			};
			ccpa?: {
				loadPrivacyManagerModal?: (id: number) => void;
			};
		};

		// IAB interfaces - only one should be present at a time
		__uspapi?: (
			command: string,
			version: number,
			callback: (tcData: CCPAData | undefined, success: boolean) => void,
		) => void;
		__tcfapi?: (
			command: string,
			version: number,
			callback: (tcData: TCData, success: boolean) => void,
			vendorIDs?: number[],
		) => void;
	}
}
