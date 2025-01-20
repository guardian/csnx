import type {
	OphanComponentEvent,
	OphanRecordFunction,
} from '../../ophan/@types';
import { SourcePointChoiceTypes } from './sourcepointConfig';

export type SourcepointButtonActions =
	| 'accept'
	| 'reject'
	| 'manage-cookies'
	| 'dismiss';

const getOphanRecordFunction = (): OphanRecordFunction => {
	const record = window.guardian?.ophan?.record;

	if (record) {
		return record;
	}
	console.log('window.guardian.ophan.record is not available');
	return () => {};
};

export const sendConsentChoicesToOphan = (
	choiceType: number,
	messageId: string,
): void => {
	let actionValue: string = '';
	switch (choiceType) {
		case SourcePointChoiceTypes.AcceptAll:
			actionValue = 'accept-all';
			break;
		case SourcePointChoiceTypes.RejectAll:
			actionValue = 'reject-all';
			break;
		case SourcePointChoiceTypes.Dismiss:
			actionValue = 'dismiss';
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
	console.log('Sending consent choices to Ophan:', componentEvent);
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

	console.log('Sending consent choices to Ophan:', componentEvent);
};
