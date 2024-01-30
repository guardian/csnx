import { onConsentChange } from './onConsentChange';
import type { Callback, ConsentState } from './types';
import type { TCFv2ConsentState } from './types/tcfv2';
import {cmpGetCookie, cmpSetCookie } from './cmpCookies';
import { getCookie as getCookie_, setCookie as setCookie_} from '@guardian/libs';

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

describe('cookies return the expected consent', () => {
	let mockContains:any;

	beforeEach(() => {
        mockContains = 'someTestData';

        (getCookie_ as jest.Mock).mockImplementation(({name }: {
			name: string;
		}) => {
			if (name === 'gu.mock') {return mockContains}
			else {return(null)}
        });

        (setCookie_ as jest.Mock).mockImplementation(({ name, value }: {
			name: string;
			value: string;
		}) => {
            if (name === 'gu.mock') {mockContains = value;}
        });
    });

    test('Targeted advertising get cookie returns null when canTarget is false', async () => {
        const consentState: ConsentState = {
            tcfv2: tcfv2ConsentState,
            canTarget: false,
            framework: 'tcfv2',
        };
        mockOnConsentChange(consentState);
        const cookieValue = await cmpGetCookie({useCase: 'Targeted advertising', name: 'gu.mock'});
        expect(cookieValue).toEqual(null);
    });
	test('Targeted advertising can set and get cookies when canTarget is true', async () => {
        const consentState: ConsentState = {
            tcfv2: tcfv2ConsentState,
            canTarget: true,
            framework: 'tcfv2',
        };
        mockOnConsentChange(consentState);
		const cookieValueDefault = await cmpGetCookie({useCase: 'Targeted advertising', name: 'gu.mock'});
        expect(cookieValueDefault).toEqual('someTestData');
		await cmpSetCookie({useCase: 'Essential', name: 'gu.mock', value: 'testdataAd'});
        const cookieValue = await cmpGetCookie({useCase: 'Targeted advertising', name: 'gu.mock'});
        expect(cookieValue).toEqual('testdataAd');
    });
    test('Essential can set and get cookies when no consents', async () => {
        const consentState: ConsentState = {
            tcfv2: tcfv2ConsentStateNoConsent,
            canTarget: false,
            framework: 'tcfv2',
        };
        mockOnConsentChange(consentState);
		const cookieValueDefault = await cmpGetCookie({useCase: 'Essential', name:'gu.mock'});
        expect(cookieValueDefault).toEqual('someTestData');
        await cmpSetCookie({useCase: 'Essential', name: 'gu.mock', value: 'testdata'});
		const cookieValue = await cmpGetCookie({useCase: 'Essential', name: 'gu.mock'});
        expect(cookieValue).toEqual('testdata');
    });
	test('get null if cookie does not exist', async () => {
        const consentState: ConsentState = {
            tcfv2: tcfv2ConsentStateNoConsent,
            canTarget: false,
            framework: 'tcfv2',
        };
        mockOnConsentChange(consentState);
		const cookieValue = await cmpGetCookie({useCase: 'Essential', name: 'gu.does_not_exist'});
        expect(cookieValue).toEqual(null);
    });
});
