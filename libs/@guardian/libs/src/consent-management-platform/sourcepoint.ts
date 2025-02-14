import type { CountryCode } from '../index.test';
import { log } from '../logger/logger';
import { isExcludedFromCMP } from './exclusionList';
import { setCurrentFramework } from './getCurrentFramework';
import {
	getSupportSignUpPage,
	isConsentOrPayCountry,
	setIsConsentOrPay,
} from './isConsentOrPay';
import { isGuardianDomain } from './lib/domain';
import { mark } from './lib/mark';
import {
	constructBannerMessageId,
	sendConsentChoicesToOphan,
	sendMessageReadyToOphan,
} from './lib/ophan';
import type { Property } from './lib/property';
import {
	ACCOUNT_ID,
	ENDPOINT,
	PROPERTY_HREF_MAIN,
	PROPERTY_HREF_SUBDOMAIN,
	PROPERTY_ID_AUSTRALIA,
	PROPERTY_ID_MAIN,
	PROPERTY_ID_SUBDOMAIN,
	SourcePointChoiceTypes,
} from './lib/sourcepointConfig';
import { mergeVendorList } from './mergeUserConsent';
import { invokeCallbacks } from './onConsentChange';
import { stub } from './stub';
import type { ConsentFramework } from './types';
import type { SPUserConsent } from './types/tcfv2';

let resolveWillShowPrivacyMessage: typeof Promise.resolve;
export const willShowPrivacyMessage = new Promise<boolean>((resolve) => {
	resolveWillShowPrivacyMessage = resolve as typeof Promise.resolve;
});

/**
 * @param  {ConsentFramework} framework
 * @returns Property
 * Given a CMP framework, returns the SourcePoint property associated with it.
 * Australia has a single property while the rest of the world has a test and prod property.
 * TODO: incorporate au.theguardian into *.theguardian.com
 */
const getPropertyHref = (
	framework: ConsentFramework,
	useNonAdvertisedList: boolean,
): Property => {
	if (framework == 'aus') {
		return 'https://au.theguardian.com';
	}

	return isGuardianDomain()
		? null
		: useNonAdvertisedList
			? PROPERTY_HREF_SUBDOMAIN
			: PROPERTY_HREF_MAIN;
};

const getPropertyId = (
	framework: ConsentFramework,
	useNonAdvertisedList: boolean,
): number => {
	if (framework == 'aus') {
		return PROPERTY_ID_AUSTRALIA;
	}

	if (framework == 'usnat') {
		return PROPERTY_ID_MAIN;
	}

	return useNonAdvertisedList ? PROPERTY_ID_SUBDOMAIN : PROPERTY_ID_MAIN;
};

/**
 * This function checks the hasConsentData in the localStorage
 * It returns false if it can't find the key to ensure
 *
 * @return {*}  {boolean} User has consented to the non-advertised list
 */
const hasConsentedToNonAdvertisedList = (): boolean => {
	const spUserConsentString = localStorage.getItem(
		`_sp_user_consent_${PROPERTY_ID_SUBDOMAIN}`,
	);
	const userConsent = JSON.parse(spUserConsentString ?? '{}') as SPUserConsent;
	return userConsent.gdpr?.consentStatus.hasConsentData ?? false;
};

export const init = (
	framework: ConsentFramework,
	countryCode: CountryCode,
	isUserSignedIn: boolean,
	useNonAdvertisedList: boolean,
	pubData = {},
): void => {
	stub(framework);

	// make sure nothing else on the page has accidentally
	// used the `_sp_` name as well
	if (window._sp_) {
		throw new Error('Sourcepoint global (window._sp_) is already defined!');
	}

	setCurrentFramework(framework);

	const isCorpABTest: boolean = window.location.search.includes('CORP_FLAG');

	// To ensure users who are not part of Consent or Pay country or AB Test
	if (!isCorpABTest || !isConsentOrPayCountry(countryCode)) {
		useNonAdvertisedList = false;
	}

	setIsConsentOrPay(
		isConsentOrPayCountry(countryCode) && !useNonAdvertisedList && isCorpABTest,
	);

	if (
		isConsentOrPayCountry(countryCode) &&
		useNonAdvertisedList &&
		!hasConsentedToNonAdvertisedList()
	) {
		mergeVendorList().catch((error) => {
			console.log('Failed to merge vendor list', error);
		});
	}

	// invoke callbacks before we receive Sourcepoint
	invokeCallbacks();

	let frameworkMessageType: string;
	switch (framework) {
		case 'usnat':
			frameworkMessageType = 'usnat';
			break;
		case 'aus':
			frameworkMessageType = 'ccpa';
			break;
		case 'tcfv2':
		default:
			frameworkMessageType = 'gdpr';
			break;
	}

	let messageId: string;

	const isInPropertyIdABTest =
		window.guardian?.config?.tests?.useSourcepointPropertyIdVariant ===
		'variant';

	log('cmp', `framework: ${framework}`);
	log('cmp', `frameworkMessageType: ${frameworkMessageType}`);

	const pageSection = window.guardian?.config?.page?.section;

	window._sp_queue = [];
	/* istanbul ignore next */
	window._sp_ = {
		config: {
			baseEndpoint: ENDPOINT,
			accountId: ACCOUNT_ID,
			propertyId: getPropertyId(framework, useNonAdvertisedList),
			propertyHref: getPropertyHref(framework, useNonAdvertisedList),
			targetingParams: {
				framework,
				excludePage: isExcludedFromCMP(pageSection),
			},
			pubData: { ...pubData, cmpInitTimeUtc: new Date().getTime() },

			// ccpa or gdpr object added below

			events: {
				onConsentReady: (message_type, consentUUID, euconsent) => {
					log('cmp', `onConsentReady ${message_type}`);
					if (message_type != frameworkMessageType) {
						return;
					}

					log('cmp', `consentUUID ${consentUUID}`);
					log('cmp', `euconsent ${euconsent}`);

					mark('cmp-got-consent');

					// onConsentReady is triggered before SP update the consent settings :(
					setTimeout(invokeCallbacks, 0);
				},
				onMessageReady: (message_type) => {
					log('cmp', `onMessageReady ${message_type}`);
					if (message_type != frameworkMessageType) {
						return;
					}

					// Event fires when a message is about to display.
					mark('cmp-ui-displayed');
				},

				onMessageReceiveData: (message_type, data) => {
					// Event fires when a message is displayed to the user and sends data about the message and campaign to the callback.
					// The data sent to the callback is in the following structure:
					log('cmp', `onMessageReceiveData ${message_type}`);
					if (message_type != frameworkMessageType) {
						return;
					}

					// The messageId is 0 when no message is displayed
					if (data.messageId !== 0) {
						messageId = data.messageId;
						sendMessageReadyToOphan(
							constructBannerMessageId(messageId.toString()),
						);
					}

					log('cmp', 'onMessageReceiveData ', data);
					void resolveWillShowPrivacyMessage(data.messageId !== 0);
				},

				onMessageChoiceSelect: (message_type, choice_id, choiceTypeID) => {
					log('cmp', `onMessageChoiceSelect message_type: ${message_type}`);

					if (message_type != frameworkMessageType) {
						return;
					}

					log('cmp', `onMessageChoiceSelect choice_id: ${choice_id}`);
					log('cmp', `onMessageChoiceSelect choice_type_id: ${choiceTypeID}`);

					sendConsentChoicesToOphan(
						choiceTypeID,
						constructBannerMessageId(messageId.toString()),
					);

					// https://documentation.sourcepoint.com/web-implementation/web-implementation/multi-campaign-web-implementation/event-callbacks#choice-type-id-descriptions
					if (
						choiceTypeID === SourcePointChoiceTypes.AcceptAll ||
						choiceTypeID === SourcePointChoiceTypes.RejectAll ||
						choiceTypeID === SourcePointChoiceTypes.Dismiss
					) {
						setTimeout(invokeCallbacks, 0);

						if (
							choiceTypeID === SourcePointChoiceTypes.RejectAll &&
							message_type === 'gdpr' &&
							isConsentOrPayCountry(countryCode) &&
							!useNonAdvertisedList &&
							isCorpABTest
						) {
							window.location.href = getSupportSignUpPage();
						}
					}
				},
				onPrivacyManagerAction: function (message_type, pmData) {
					log('cmp', `onPrivacyManagerAction message_type: ${message_type}`);
					if (message_type != frameworkMessageType) {
						return;
					}

					log('cmp', `onPrivacyManagerAction ${pmData}`);
				},
				onMessageChoiceError: function (message_type, err) {
					log('cmp', `onMessageChoiceError ${message_type}`);
					if (message_type != frameworkMessageType) {
						return;
					}

					log('cmp', `onMessageChoiceError ${err}`);
				},
				onPMCancel: function (message_type) {
					log('cmp', `onPMCancel ${message_type}`);
					if (message_type != frameworkMessageType) {
						return;
					}
				},
				onSPPMObjectReady: function () {
					log('cmp', 'onSPPMObjectReady');
				},
				onError: function (message_type, errorCode, errorObject, userReset) {
					log('cmp', `errorCode: ${message_type}`);
					if (message_type != frameworkMessageType) {
						return;
					}

					log('cmp', `errorCode: ${errorCode}`);
					log('cmp', errorObject);
					log('cmp', `userReset: ${userReset}`);
				},
			},
		},
	};

	if (isInPropertyIdABTest) {
		window._sp_.config.propertyId = getPropertyId(
			framework,
			useNonAdvertisedList,
		);
	}

	// NOTE - Contrary to the SourcePoint documentation, it's important that we add EITHER gdpr OR ccpa
	// to the _sp_ object. wrapperMessagingWithoutDetection.js uses the presence of these keys to attach
	// __tcfapi or __uspapi to the window object respectively. If both of these functions appear on the window,
	// advertisers seem to assume that __tcfapi is the one to use, breaking CCPA consent.
	// https://documentation.sourcepoint.com/implementation/web-implementation/multi-campaign-web-implementation#implementation-code-snippet-overview

	switch (framework) {
		case 'tcfv2':
			window._sp_.config.gdpr = {
				targetingParams: {
					framework,
					excludePage: isExcludedFromCMP(pageSection),
					isCorP: isConsentOrPayCountry(countryCode),
					isUserSignedIn,
					isCorpABTest,
				},
			};
			break;
		case 'usnat':
			window._sp_.config.usnat = {
				targetingParams: {
					framework,
				},
				includeUspApi: true,
				transitionCCPAAuth: true,
			};
			break;
		case 'aus':
			window._sp_.config.ccpa = {
				targetingParams: {
					framework,
				},
			};
			break;
	}

	// TODO use libs function loadScript,
	// change signature of init function to return promise returned by loadScript
	const spLib = document.createElement('script');
	spLib.id = 'sourcepoint-lib';
	spLib.src = `${ENDPOINT}/unified/wrapperMessagingWithoutDetection.js`;

	document.body.appendChild(spLib);
};
