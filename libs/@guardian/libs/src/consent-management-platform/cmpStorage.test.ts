import { onConsentChange } from './onConsentChange';
import type { Callback, ConsentState } from './types';
import type { TCFv2ConsentState } from './types/tcfv2';
import {storage} from './cmpStorage';
import { storage as storageStub} from '@guardian/libs';

//TODO: add tests for all use-cases and all other storage functions

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

const mockOnConsentChange = (consentState: ConsentState) =>
	(onConsentChange as jest.Mock).mockImplementation((cb: Callback) => cb(consentState));

describe('local storage returns the expected consent', () => {
	let mockContains:any;

	beforeEach(() => {
        mockContains = 'someTestData';

        (storageStub.local.get as jest.Mock).mockImplementation((key:string) => {
            if (key === 'gu.mock') {return mockContains}
			else {return(null)}
        });

        (storageStub.local.set as jest.Mock).mockImplementation((key:string, data:unknown) => {
            if (key === 'gu.mock') {mockContains = data;}
        });
    });

    test('Targeted advertising get local storage returns null when canTarget is false', async () => {
        const consentState: ConsentState = {
            tcfv2: tcfv2ConsentState,
            canTarget: false,
            framework: 'tcfv2',
        };
        mockOnConsentChange(consentState);
        const localStorageValue = await storage.local.get('Targeted advertising', 'gu.mock');
        expect(localStorageValue).toEqual(null);
    });
	test('Targeted advertising can set and get local storage value when canTarget is true', async () => {
        const consentState: ConsentState = {
            tcfv2: tcfv2ConsentState,
            canTarget: true,
            framework: 'tcfv2',
        };
        mockOnConsentChange(consentState);
		const localStorageValueDefault = await storage.local.get('Targeted advertising', 'gu.mock');
        expect(localStorageValueDefault).toEqual('someTestData');
		await storage.local.set('Essential', 'gu.mock', 'testdataAd');
        const localStorageValue = await storage.local.get('Targeted advertising', 'gu.mock');
        expect(localStorageValue).toEqual('testdataAd');
    });
    test('Essential can set and get local storage when no consents', async () => {
        const consentState: ConsentState = {
            tcfv2: tcfv2ConsentStateNoConsent,
            canTarget: false,
            framework: 'tcfv2',
        };
        mockOnConsentChange(consentState);
		const localStorageValueDefault = await storage.local.get('Essential', 'gu.mock');
        expect(localStorageValueDefault).toEqual('someTestData');
        await storage.local.set('Essential', 'gu.mock', 'testdata');
		const localStorageValue = await storage.local.get('Essential', 'gu.mock');
        expect(localStorageValue).toEqual('testdata');
    });
	test('get null if local storage item does not exist', async () => {
        const consentState: ConsentState = {
            tcfv2: tcfv2ConsentStateNoConsent,
            canTarget: false,
            framework: 'tcfv2',
        };
        mockOnConsentChange(consentState);
		const localStorageValue = await storage.local.get('Essential', 'gu.does_not_exist');
        expect(localStorageValue).toEqual(null);
    });
});


describe('session storage returns the expected consent', () => {
	let mockContains:any;

	beforeEach(() => {
        mockContains = 'someTestData';

        (storageStub.session.get as jest.Mock).mockImplementation((key:string) => {
            if (key === 'gu.mock') {return mockContains}
			else {return(null)}
        });

        (storageStub.session.set as jest.Mock).mockImplementation((key:string, data:unknown) => {
            if (key === 'gu.mock') {mockContains = data;}
        });
    });

    test('Targeted advertising get session storage returns null when canTarget is false', async () => {
        const consentState: ConsentState = {
            tcfv2: tcfv2ConsentState,
            canTarget: false,
            framework: 'tcfv2',
        };
        mockOnConsentChange(consentState);
        const sessionStorageValue = await storage.session.get('Targeted advertising', 'gu.mock');
        expect(sessionStorageValue).toEqual(null);
    });
	test('Targeted advertising can set and get session storage value when canTarget is true', async () => {
        const consentState: ConsentState = {
            tcfv2: tcfv2ConsentState,
            canTarget: true,
            framework: 'tcfv2',
        };
        mockOnConsentChange(consentState);
		const sessionStorageValueDefault = await storage.session.get('Targeted advertising', 'gu.mock');
        expect(sessionStorageValueDefault).toEqual('someTestData');
		await storage.session.set('Essential', 'gu.mock', 'testdataAd');
        const sessionStorageValue = await storage.session.get('Targeted advertising', 'gu.mock');
        expect(sessionStorageValue).toEqual('testdataAd');
    });
    test('Essential can set and get session storage when no consents', async () => {
        const consentState: ConsentState = {
            tcfv2: tcfv2ConsentStateNoConsent,
            canTarget: false,
            framework: 'tcfv2',
        };
        mockOnConsentChange(consentState);
		const sessionStorageValueDefault = await storage.session.get('Essential', 'gu.mock');
        expect(sessionStorageValueDefault).toEqual('someTestData');
        await storage.session.set('Essential', 'gu.mock', 'testdata');
		const sessionStorageValue = await storage.session.get('Essential', 'gu.mock');
        expect(sessionStorageValue).toEqual('testdata');
    });
	test('get null if session storage item does not exist', async () => {
        const consentState: ConsentState = {
            tcfv2: tcfv2ConsentStateNoConsent,
            canTarget: false,
            framework: 'tcfv2',
        };
        mockOnConsentChange(consentState);
		const sessionStorageValue = await storage.session.get('Essential', 'gu.does_not_exist');
        expect(sessionStorageValue).toEqual(null);
    });
});
