import ophan from '@guardian/ophan-tracker-js';
import { SourcePointChoiceTypes } from './sourcepointConfig';

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
	ophan.record({
		componentEvent: {
			component: {
				componentType: 'CONSENT', //CONSENT_OR_PAY_BANNER
				id: 'privacy-manager', // TODO: is this the right id?
			},
			action: 'CLICK',
			value: actionValue,
		},
		ab: {
			tests: [{ name: 'relevant ab-test', variant: 'treatment' }], // TODO: what abtest?
		},
	});
};

export const sendMessageReadyToOphan = (): void => {
	ophan.record({
		componentEvent: {
			component: {
				componentType: 'CONSENT',
				id: 'privacy-manager', // TODO: is this the right id?
			},
			action: 'VIEW',
			value: 'message-read',
		},
		ab: {
			tests: [{ name: 'relevant ab-test', variant: 'treatment' }], // TODO: what abtest?
		},
	});
};
