import { initVendorDataManager } from './vendorDataManager';
import { onConsentChange } from './onConsentChange';
import { removeCookie, storage } from '@guardian/libs';
import { vendorStorageIds } from './vendorStorageIds';
import { Callback, ConsentState } from './types';
import { TCFv2ConsentState } from './types/tcfv2';

jest.mock('./onConsentChange');

Object.defineProperty(window, 'requestIdleCallback', {
	writable: false,
	value: jest.fn().mockImplementation((cb) => cb()),
});

const tcfv2ConsentState: TCFv2ConsentState = {
	consents: { 1: true },
	eventStatus: 'tcloaded',
	vendorConsents: {
		'5fa51b29a228638b4a1980e4': true, // ipsos
		'5eff0d77969bfa03746427eb': false, // permutive
	},
	addtlConsent: 'xyz',
	gdprApplies: true,
	tcString: 'YAAA',
};

jest.mock('./vendors', () => ({
	VendorIDs: {
		permutive: ['5eff0d77969bfa03746427eb'],
		ipsos: ['5fa51b29a228638b4a1980e4'],
	},
}));

jest.mock('./vendorStorageIds', () => ({
	vendorStorageIds: {
		permutive: {
			cookies: ['permutiveCookie1', 'permutiveCookie2'],
			localStorage: ['permutiveLocalStorage1', 'permutiveLocalStorage2'],
			sessionStorage: ['permutiveSessionStorage1'],
		},
		ipsos: {
			cookies: ['ipsosCookie1', 'ipsosCookie2'],
			localStorage: ['ipsosLocalStorage1', 'ipsosLocalStorage2'],
			sessionStorage: ['ipsosSessionStorage1'],
		},
	},
}));

const mockOnConsentChange = (consentState: ConsentState) =>
	(onConsentChange as jest.Mock).mockImplementation((cb: Callback) =>
		cb(consentState),
	);

jest.mock('@guardian/libs', () => ({
	removeCookie: jest.fn(),
	storage: {
		local: {
			remove: jest.fn(),
		},
		session: {
			remove: jest.fn(),
		},
	},
}));

describe('initVendorDataManager', () => {
	it('should remove cookies and localStorage data only for vendors that the user has not consented to', async () => {
		const consentState: ConsentState = {
			tcfv2: tcfv2ConsentState,
			canTarget: true,
			framework: 'tcfv2',
		};

		mockOnConsentChange(consentState);

		initVendorDataManager();

		vendorStorageIds.permutive.cookies.forEach((name) => {
			expect(removeCookie).toHaveBeenCalledWith({ name });
		});

		vendorStorageIds.ipsos.cookies.forEach((name) => {
			expect(removeCookie).not.toHaveBeenCalledWith({ name });
		});

		vendorStorageIds.permutive.localStorage.forEach((name) => {
			expect(storage.local.remove).toHaveBeenCalledWith(name);
		});

		vendorStorageIds.permutive.sessionStorage.forEach((name) => {
			expect(storage.session.remove).toHaveBeenCalledWith(name);
		});

		vendorStorageIds.ipsos.localStorage.forEach((name) => {
			expect(storage.local.remove).not.toHaveBeenCalledWith(name);
		});
	});
});
