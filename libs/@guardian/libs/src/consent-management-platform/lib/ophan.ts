import type {
	OphanComponentEvent,
	OphanRecordFunction,
} from '../../ophan/@types';
import { getIsConsentOrPay } from '../isConsentOrPay';
import { SourcePointChoiceTypes } from './sourcepointConfig';

export type SourcepointButtonActions =
	| 'accept'
	| 'reject'
	| 'manage-cookies'
	| 'dismiss'
	| undefined;

export type SourcepointMessageType = 'ACCEPT_REJECT' | 'CONSENT_OR_PAY_BANNER';
const getOphanRecordFunction = (): OphanRecordFunction => {
	const record = window.guardian?.ophan?.record;

	if (record) {
		return record;
	}
	console.log('window.guardian.ophan.record is not available');
	return () => {};
};

export const constructBannerMessageId = (messageId: string): string => {
	const messageType: SourcepointMessageType = getIsConsentOrPay()
		? 'CONSENT_OR_PAY_BANNER'
		: 'ACCEPT_REJECT';
	return `${messageType}-${messageId}`;
};

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
		case SourcePointChoiceTypes.Redirect:
			actionValue = 'reject';
			break;
		default:
			actionValue = undefined;
			break;
	}
	const componentEvent: OphanComponentEvent = {
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

export const sendMessageReadyToOphan = (messageId: string): void => {
	const componentEvent: OphanComponentEvent = {
		component: {
			componentType: 'CONSENT',
			id: messageId,
		},
		action: 'VIEW',
	};

	const record = getOphanRecordFunction();
	record({ componentEvent });
};
