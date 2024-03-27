import { getConsentState as getAUSConsentState } from './aus/getConsentState';
import { getConsentState as getCCPAConsentState } from './ccpa/getConsentState';
import { setCurrentFramework, unsetFramework } from './getCurrentFramework';
import { _ } from './onConsentChange';
import { getConsentState as getTCFv2ConsentState } from './tcfv2/getConsentState';
import type { ConsentState, Framework } from './types';
import type { AUSConsentState } from './types/aus';
import type { CCPAConsentState } from './types/ccpa';
import type { TCFv2ConsentState } from './types/tcfv2';

jest.mock('./tcfv2/getConsentState');
jest.mock('./ccpa/getConsentState');
jest.mock('./aus/getConsentState');

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

const setAPI = (framework: Framework | null) => {
	if (framework === 'ccpa') {
		setCurrentFramework('ccpa');
		return;
	} else if (framework === 'aus') {
		setCurrentFramework('aus');
		return;
	} else if (framework === 'tcfv2') {
		setCurrentFramework('tcfv2');
		return;
	} else {
		unsetFramework();
	}
};

const setGpc = (globalPrivacyControl: undefined | boolean) => {
	navigator.globalPrivacyControl = globalPrivacyControl;
};

describe('onConsentChange enhances basic consent state', () => {
	test('tcfv2 can target', async () => {
		(getTCFv2ConsentState as jest.Mock).mockImplementation(() =>
			Promise.resolve<TCFv2ConsentState>(tcfv2ConsentState),
		);
		setAPI('tcfv2');
		const expectedConsentState: ConsentState = {
			tcfv2: tcfv2ConsentState,
			canTarget: true,
			framework: 'tcfv2',
		};
		const consentState = await _.getConsentState();
		expect(consentState).toEqual(expectedConsentState);
	});
	test('tcfv2 can NOT target', async () => {
		const basicConsentState = {
			...tcfv2ConsentState,
			consents: { 1: false },
		};
		(getTCFv2ConsentState as jest.Mock).mockImplementation(() =>
			Promise.resolve<TCFv2ConsentState>(basicConsentState),
		);
		setAPI('tcfv2');
		const expectedConsentState: ConsentState = {
			tcfv2: basicConsentState,
			canTarget: false,
			framework: 'tcfv2',
		};
		const consentState = await _.getConsentState();
		expect(consentState).toEqual(expectedConsentState);
	});
	test('ccpa can target', async () => {
		(getCCPAConsentState as jest.Mock).mockImplementation(() =>
			Promise.resolve<CCPAConsentState>(ccpaConsentState),
		);
		setAPI('ccpa');
		const expectedConsentState: ConsentState = {
			ccpa: ccpaConsentState,
			canTarget: true,
			framework: 'ccpa',
		};
		const consentState = await _.getConsentState();
		expect(consentState).toEqual(expectedConsentState);
	});
	test('ccpa can NOT target', async () => {
		(getCCPAConsentState as jest.Mock).mockImplementation(() =>
			Promise.resolve<CCPAConsentState>({ doNotSell: true }),
		);
		setAPI('ccpa');
		const expectedConsentState: ConsentState = {
			ccpa: { doNotSell: true },
			canTarget: false,
			framework: 'ccpa',
		};
		const consentState = await _.getConsentState();
		expect(consentState).toEqual(expectedConsentState);
	});
	test('aus can target', async () => {
		(getAUSConsentState as jest.Mock).mockImplementation(() =>
			Promise.resolve<AUSConsentState>(ausConsentState),
		);
		setAPI('aus');
		const expectedConsentState: ConsentState = {
			aus: ausConsentState,
			canTarget: true,
			framework: 'aus',
		};
		const consentState = await _.getConsentState();
		expect(consentState).toEqual(expectedConsentState);
	});
	test('aus can NOT target', async () => {
		(getAUSConsentState as jest.Mock).mockImplementation(() =>
			Promise.resolve<AUSConsentState>({
				personalisedAdvertising: false,
			}),
		);
		setAPI('aus');
		const expectedConsentState: ConsentState = {
			aus: {
				personalisedAdvertising: false,
			},
			canTarget: false,
			framework: 'aus',
		};
		const consentState = await _.getConsentState();
		expect(consentState).toEqual(expectedConsentState);
	});
	test('unknown region rejects', async () => {
		setAPI(null);
		await expect(_.getConsentState()).rejects.toEqual(
			new Error('no IAB consent framework found on the page'),
		);
	});
	test('notices a GPC signal', async () => {
		setGpc(true);
		(getCCPAConsentState as jest.Mock).mockImplementation(() =>
			Promise.resolve<CCPAConsentState>(ccpaConsentState),
		);
		setAPI('ccpa');
		const expectedConsentState: ConsentState = {
			ccpa: ccpaConsentState,
			canTarget: true,
			framework: 'ccpa',
			gpcSignal: true,
		};

		const consentState = await _.getConsentState();
		expect(consentState).toEqual(expectedConsentState);
	});
});
