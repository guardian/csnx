import type { getConsentFor } from '../getConsentFor';
import type { Property } from '../lib/property';
import type { EndPoint } from '../lib/sourcepointConfig';
import type { onConsent } from '../onConsent';
import type { onConsentChange } from '../onConsentChange';
import type { rejectAll } from '../rejectAll';
import type { AUSData } from './aus';
import type { TCData } from './tcfv2/TCData';
import type { GPPData } from './usnat';
import type { CMP, ConsentFramework, PubData } from '.';

type OnMessageChoiceSelect = (
	message_type: string,
	choice_id: number,
	choiceTypeID: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 9 | 10 | 11 | 12 | 13 | 14 | 15,
) => void;

type GuCmpHotFix = {
	initialised?: boolean;
	cmp?: CMP;
	onConsent?: typeof onConsent;
	onConsentChange?: typeof onConsentChange;
	getConsentFor?: typeof getConsentFor;
	rejectAll?: typeof rejectAll;
};

declare global {
	interface Window {
		// *************** START commercial.dcr.js hotfix ***************
		guCmpHotFix: GuCmpHotFix;
		// *************** END commercial.dcr.js hotfix ***************
		_sp_queue: [];
		_sp_?: {
			config: {
				baseEndpoint: EndPoint;
				accountId: number;
				propertyHref?: Property;
				propertyId?: number;
				campaignEnv: 'prod' | 'stage';
				targetingParams: {
					framework: ConsentFramework;
					excludePage: boolean;
				};
				ccpa?: {
					targetingParams?: {
						framework: ConsentFramework;
					};
				};
				gdpr?: {
					targetingParams?: {
						framework: ConsentFramework;
						subscriber: boolean;
						isFeatureFlagEnabled?: boolean;
						excludePage: boolean;
					};
				};
				usnat?: {
					includeUspApi?: boolean;
					transitionCCPAAuth?: boolean;
					targetingParams?: {
						framework: ConsentFramework;
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
					onMessageChoiceError: (message_type: string, err: string) => void;
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
			usnat?: {
				loadPrivacyManagerModal?: (id: number) => void;
			};
		};

		// IAB interfaces - only one should be present at a time
		__uspapi?: (
			command: string,
			version: number,
			callback: (tcData: AUSData | undefined, success: boolean) => void,
		) => void;
		__tcfapi?: (
			command: string,
			version: number,
			callback: (tcData: TCData, success: boolean) => void,
			vendorIDs?: number[],
		) => void;
		__gpp?: (
			command: string,
			callback: (gppData: GPPData, success: boolean) => void,
		) => void;
	}
}
