import { hasConsentForUseCaseWithConsentState } from './hasConsentForUseCase';
import { ConsentState } from './types';
import type { TCFv2ConsentState } from './types/tcfv2';

//TODO: add tests for all use-cases

jest.mock('./onConsentChange');
jest.mock('@guardian/libs', () => ({
    getCookie: jest.fn(),
	setCookie: jest.fn(),
	storage: {
        local: {
            get: jest.fn(),
            set: jest.fn(),
        },
		session: {
            get: jest.fn(),
            set: jest.fn(),
        },
    }
}));

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

const tcfv2ConsentStateNoConsent: TCFv2ConsentState = {
    consents: { 1: false },
    eventStatus: 'tcloaded',
    vendorConsents: {},
    addtlConsent: 'xyz',
    gdprApplies: true,
    tcString: 'YAAA',
};

describe('cmpStorage.hasConsentForUseCase returns the expected consent', () => {
	test('Targeted advertising has consent when canTarget is true', async () => {
		const consentState: ConsentState = {
			tcfv2: tcfv2ConsentState,
			canTarget: true,
			framework: 'tcfv2',
		};
		const hasConsent = hasConsentForUseCaseWithConsentState('Targeted advertising', consentState);
		expect(hasConsent).toEqual(true);
	});
	test('Targeted advertising has no consent when canTarget is false', async () => {
		const consentState: ConsentState = {
			tcfv2: tcfv2ConsentState,
			canTarget: false,
			framework: 'tcfv2',
		};
		const hasConsent = hasConsentForUseCaseWithConsentState('Targeted advertising', consentState);
		expect(hasConsent).toEqual(false);
	});
	test('Essential has consent even when ConsentState has no consents', async () => {
		const consentState: ConsentState = {
			tcfv2: tcfv2ConsentStateNoConsent,
			canTarget: false,
			framework: 'tcfv2',
		};
		const hasConsent = hasConsentForUseCaseWithConsentState('Essential', consentState);
		expect(hasConsent).toEqual(true);
	});
});
