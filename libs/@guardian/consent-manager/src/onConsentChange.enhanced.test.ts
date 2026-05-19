import { jest } from '@jest/globals';
import { setCurrentFramework, unsetFramework } from './getCurrentFramework';
import type { ConsentFramework, ConsentState } from './types';
import type { AUSConsentState } from './types/aus';
import type { TCFv2ConsentState } from './types/tcfv2';
import type { USNATConsentState } from './types/usnat';

jest.unstable_mockModule('./tcfv2/getConsentState', () => ({
	getConsentState: jest.fn(),
}));
jest.unstable_mockModule('./usnat/getConsentState', () => ({
	getConsentState: jest.fn(),
}));
jest.unstable_mockModule('./aus/getConsentState', () => ({
	getConsentState: jest.fn(),
}));

const { getConsentState: getTCFv2ConsentState } =
	await import('./tcfv2/getConsentState');
const { getConsentState: getUSNATConsentState } =
	await import('./usnat/getConsentState');
const { getConsentState: getAUSConsentState } =
	await import('./aus/getConsentState');
const { _ } = await import('./onConsentChange');

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

const usnatConsentState: USNATConsentState = {
	doNotSell: false,
	signalStatus: 'ready',
};

const ausConsentState: AUSConsentState = {
	personalisedAdvertising: true,
	signalStatus: 'ready',
};

const setAPI = (framework: ConsentFramework | null) => {
	if (framework === 'usnat') {
		setCurrentFramework('usnat');
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
		jest
			.mocked(getTCFv2ConsentState)
			.mockImplementation(() =>
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
		jest
			.mocked(getTCFv2ConsentState)
			.mockImplementation(() =>
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
	test('usnat can target', async () => {
		jest
			.mocked(getUSNATConsentState)
			.mockImplementation(() =>
				Promise.resolve<USNATConsentState>(usnatConsentState),
			);
		setAPI('usnat');
		const expectedConsentState: ConsentState = {
			usnat: usnatConsentState,
			canTarget: true,
			framework: 'usnat',
		};
		const consentState = await _.getConsentState();
		expect(consentState).toEqual(expectedConsentState);
	});
	test('usnat can NOT target', async () => {
		jest.mocked(getUSNATConsentState).mockImplementation(() =>
			Promise.resolve<USNATConsentState>({
				doNotSell: true,
				signalStatus: 'ready',
			}),
		);
		setAPI('usnat');
		const expectedConsentState: ConsentState = {
			usnat: { doNotSell: true, signalStatus: 'ready' },
			canTarget: false,
			framework: 'usnat',
		};
		const consentState = await _.getConsentState();
		expect(consentState).toEqual(expectedConsentState);
	});
	test('aus can target', async () => {
		jest
			.mocked(getAUSConsentState)
			.mockImplementation(() =>
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
		jest.mocked(getAUSConsentState).mockImplementation(() =>
			Promise.resolve<AUSConsentState>({
				personalisedAdvertising: false,
				signalStatus: 'ready',
			}),
		);
		setAPI('aus');
		const expectedConsentState: ConsentState = {
			aus: {
				personalisedAdvertising: false,
				signalStatus: 'ready',
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
		jest
			.mocked(getUSNATConsentState)
			.mockImplementation(() =>
				Promise.resolve<USNATConsentState>(usnatConsentState),
			);
		setAPI('usnat');
		const expectedConsentState: ConsentState = {
			usnat: usnatConsentState,
			canTarget: true,
			framework: 'usnat',
			gpcSignal: true,
		};

		const consentState = await _.getConsentState();
		expect(consentState).toEqual(expectedConsentState);
	});
});
