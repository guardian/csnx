import { onConsent } from './onConsent';
import { onConsentChange } from './onConsentChange';
import type { Callback, ConsentState } from './types';
import type { AUSConsentState } from './types/aus';
import type { CCPAConsentState } from './types/ccpa';
import type { TCFv2ConsentState } from './types/tcfv2';

jest.mock('./onConsentChange');

const tcfv2ConsentState: TCFv2ConsentState = {
	consents: { 1: true },
	eventStatus: 'tcloaded',
	vendorConsents: {
		['5efefe25b8e05c06542b2a77']: true,
	},
	addtlConsent: 'xyz',
	gdprApplies: true,
	tcString: 'YAAA',
};

const ccpaConsentState: CCPAConsentState = {
	doNotSell: false,
};

const ausConsentState: AUSConsentState = {
	personalisedAdvertising: true,
};

const mockOnConsentChange = (consentState: ConsentState) =>
	(onConsentChange as jest.Mock).mockImplementation((cb: Callback) =>
		cb(consentState),
	);

describe('onConsent returns a promise that resolves the initial consent state', () => {
	test('tcfv2', async () => {
		const consentState: ConsentState = {
			tcfv2: tcfv2ConsentState,
			canTarget: true,
			framework: 'tcfv2',
		};
		mockOnConsentChange(consentState);
		const resolvedConsentState = await onConsent();
		expect(resolvedConsentState).toEqual(consentState);
	});
	test('ccpa', async () => {
		const consentState: ConsentState = {
			ccpa: ccpaConsentState,
			canTarget: true,
			framework: 'ccpa',
		};
		mockOnConsentChange(consentState);
		const resolvedConsentState = await onConsent();
		expect(resolvedConsentState).toEqual(consentState);
	});
	test('aus', async () => {
		const consentState: ConsentState = {
			aus: ausConsentState,
			canTarget: true,
			framework: 'aus',
		};
		mockOnConsentChange(consentState);
		const resolvedConsentState = await onConsent();
		expect(resolvedConsentState).toEqual(consentState);
	});
	test('unknown region rejects', async () => {
		mockOnConsentChange({ canTarget: false, framework: null });
		await expect(onConsent()).rejects.toEqual('Unknown framework');
	});
});
