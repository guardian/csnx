import type { ComponentEvent, EventPayload } from '@guardian/ophan-tracker-js';
import { getIsConsentOrPay } from '../isConsentOrPay';
import { SourcePointChoiceTypes } from './sourcepointConfig';

export type SourcepointButtonActions =
	| 'accept'
	| 'reject'
	| 'manage-cookies'
	| 'dismiss'
	| undefined;

export type SourcepointMessageType = 'ACCEPT_REJECT' | 'CONSENT_OR_PAY_BANNER';
type OphanSendFunction = (data: EventPayload, callback?: () => void) => void;
const getOphanRecordFunction = (): OphanSendFunction => {
	const record = window.guardian?.ophan?.record;

	if (record) {
		return record;
	}
	console.log('window.guardian.ophan.record is not available');
	return () => {};
};

/**
 * Construct a message ID to send to Ophan.
 *
 * @param {string} messageId
 * @return {*}  {string}
 */
export const constructBannerMessageId = (messageId: string): string => {
	const messageType: SourcepointMessageType = getIsConsentOrPay()
		? 'CONSENT_OR_PAY_BANNER'
		: 'ACCEPT_REJECT';
	return `${messageType}-${messageId}`;
};

/**
 * Send an event to Ophan when the user selects a consent choice.
 *
 * @param {number} choiceType
 * @param {string} messageId
 */
export const sendConsentChoicesToOphan = (
	choiceType: number,
	messageId: string,
): void => {
	let actionValue: SourcepointButtonActions;
	switch (choiceType) {
		case SourcePointChoiceTypes.AcceptAll:
			actionValue = 'accept';
			break;
		case SourcePointChoiceTypes.RejectAll:
			actionValue = 'reject';
			break;
		case SourcePointChoiceTypes.Dismiss:
			actionValue = 'dismiss';
			break;
		case SourcePointChoiceTypes.ManageCookies:
			actionValue = 'manage-cookies';
			break;
	}
	const componentEvent: ComponentEvent = {
		component: {
			componentType: 'CONSENT',
			id: messageId,
		},
		action: 'CLICK',
		value: actionValue,
	};

	const record = getOphanRecordFunction();
	record({ componentEvent });
};

/**
 * Send an event to Ophan when the message/banner has been viewed.
 *
 * @param {string} messageId
 */
export const sendMessageReadyToOphan = (messageId: string): void => {
	const componentEvent: ComponentEvent = {
		component: {
			componentType: 'CONSENT',
			id: messageId,
		},
		action: 'VIEW',
	};

	const record = getOphanRecordFunction();
	record({ componentEvent });
};

/**
 * Send a geolocation mismatch event to Ophan.
 *
 * @param {string} value
 */
export const sendJurisdictionMismatchToOphan = (value: string): void => {
	const componentEvent: ComponentEvent = {
		component: {
			componentType: 'CONSENT',
		},
		value: value,
		action: 'CONSENT_GEOLOCATION_MISMATCH',
	};

	const record = getOphanRecordFunction();
	record({ componentEvent });
};
