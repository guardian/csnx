import type {
	OphanComponentEvent,
	OphanRecordFunction,
} from '../../ophan/@types';
import { SourcePointChoiceTypes } from './sourcepointConfig';

const getOphanRecordFunction = (): OphanRecordFunction => {
	const record = window.guardian?.ophan?.record;

	if (record) {
		return record;
	}
	console.log('window.guardian.ophan.record is not available');
	return () => {};
};

export const sendConsentChoicesToOphan = (choiceType: number): void => {
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
			id: 'privacy-manager',
		},
		action: 'CLICK',
		value: actionValue,
	};

	const record = getOphanRecordFunction();
	record({ componentEvent });
	console.log('Sending consent choices to Ophan:', componentEvent);
};

export const sendMessageReadyToOphan = (): void => {
	const componentEvent: OphanComponentEvent = {
		component: {
			componentType: 'CONSENT',
			id: 'privacy-manager',
		},
		action: 'VIEW',
		value: 'message-read',
	};

	const record = getOphanRecordFunction();
	record({ componentEvent });

	console.log('Sending consent choices to Ophan:', componentEvent);
};
