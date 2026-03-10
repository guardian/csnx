import { getConsentDetailsForOphan } from './getConsentDetailsForOphan';
import type { ConsentState } from './types';
import type { TCFv2ConsentState } from './types/tcfv2';

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

const consentStateForTCFV2: ConsentState = {
	tcfv2: tcfv2ConsentState,
	canTarget: true,
	framework: 'tcfv2',
};

const nonConsentStateForUSNAT: ConsentState = {
	usnat: {
		doNotSell: true,
		signalStatus: 'ready',
	},
	canTarget: false,
	framework: 'usnat',
};

const consentStateForUSNAT: ConsentState = {
	usnat: {
		doNotSell: false,
		signalStatus: 'ready',
	},
	canTarget: true,
	framework: 'usnat',
};

const consentStateForAUS: ConsentState = {
	aus: {
		personalisedAdvertising: true,
	},
	canTarget: true,
	framework: 'aus',
};

const nonConsentStateForAUS: ConsentState = {
	aus: {
		personalisedAdvertising: false,
	},
	canTarget: false,
	framework: 'aus',
};

const failedConsentState: ConsentState = {
	canTarget: false,
	framework: null,
};

function setCookie(name: string, value: string) {
	document.cookie = `${name}=${value}; path=/;`;
}

function clearCookies(): void {
	document.cookie.split(';').forEach((cookie) => {
		document.cookie = cookie
			.replace(/^ +/, '')
			.replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
	});
}

describe('getConsentDetailsForOphan', () => {
	describe('when consent framework is TCFv2', () => {
		beforeEach(() => {
			setCookie('consentUUID', 'fakeConsentUUID');
		});

		afterEach(() => {
			clearCookies();
			jest.restoreAllMocks();
		});
		it('returns the correct consent details', () => {
			const ophanConsentDetails =
				getConsentDetailsForOphan(consentStateForTCFV2);
			expect(ophanConsentDetails).toEqual({
				consentJurisdiction: 'TCF',
				consentUUID: 'fakeConsentUUID',
				consent: 'YAAA',
			});
		});
	});

	describe('when consent framework is USNAT', () => {
		describe('and the only cookie dropped is usnatUUID', () => {
			beforeEach(() => {
				setCookie('usnatUUID', 'fakeUsnatUUID');
			});

			afterEach(() => {
				clearCookies();
				jest.restoreAllMocks();
			});
			it('returns the correct consent details - consent is true', () => {
				const ophanConsentDetails =
					getConsentDetailsForOphan(consentStateForUSNAT);
				expect(ophanConsentDetails).toEqual({
					consentJurisdiction: 'USNAT',
					consentUUID: 'fakeUsnatUUID',
					consent: 'true',
				});
			});

			it('returns the correct consent details - consent is false', () => {
				const ophanConsentDetails = getConsentDetailsForOphan(
					nonConsentStateForUSNAT,
				);
				expect(ophanConsentDetails).toEqual({
					consentJurisdiction: 'USNAT',
					consentUUID: 'fakeUsnatUUID',
					consent: 'false',
				});
			});
		});

		describe('and the only cookie dropped is ccpaUUID', () => {
			beforeEach(() => {
				setCookie('ccpaUUID', 'fakeCcpaUUID');
			});

			afterEach(() => {
				clearCookies();
				jest.restoreAllMocks();
			});
			it('returns the correct consent details - consent is true', () => {
				const ophanConsentDetails =
					getConsentDetailsForOphan(consentStateForUSNAT);
				expect(ophanConsentDetails).toEqual({
					consentJurisdiction: 'USNAT',
					consentUUID: 'fakeCcpaUUID',
					consent: 'true',
				});
			});

			it('returns the correct consent details - consent is false', () => {
				const ophanConsentDetails = getConsentDetailsForOphan(
					nonConsentStateForUSNAT,
				);
				expect(ophanConsentDetails).toEqual({
					consentJurisdiction: 'USNAT',
					consentUUID: 'fakeCcpaUUID',
					consent: 'false',
				});
			});
		});

		describe('and both ccpaUUID and usnatUUID are present', () => {
			beforeEach(() => {
				setCookie('ccpaUUID', 'fakeCcpaUUID');
				setCookie('usnatUUID', 'fakeUsnatUUID');
			});

			afterEach(() => {
				clearCookies();
				jest.restoreAllMocks();
			});
			it('returns the correct consent details - consent is true', () => {
				const ophanConsentDetails =
					getConsentDetailsForOphan(consentStateForUSNAT);
				expect(ophanConsentDetails).toEqual({
					consentJurisdiction: 'USNAT',
					consentUUID: 'fakeUsnatUUID',
					consent: 'true',
				});
			});

			it('returns the correct consent details - consent is false', () => {
				const ophanConsentDetails = getConsentDetailsForOphan(
					nonConsentStateForUSNAT,
				);
				expect(ophanConsentDetails).toEqual({
					consentJurisdiction: 'USNAT',
					consentUUID: 'fakeUsnatUUID',
					consent: 'false',
				});
			});
		});
	});

	describe('when consent framework is AUS', () => {
		beforeEach(() => {
			setCookie('ccpaUUID', 'fakeCcpaUUID');
		});

		afterEach(() => {
			clearCookies();
			jest.restoreAllMocks();
		});
		it('returns the correct consent details - consent is true', () => {
			const ophanConsentDetails = getConsentDetailsForOphan(consentStateForAUS);
			expect(ophanConsentDetails).toEqual({
				consentJurisdiction: 'AUS',
				consentUUID: 'fakeCcpaUUID',
				consent: 'true',
			});
		});

		it('returns the correct consent details - consent is false', () => {
			const ophanConsentDetails = getConsentDetailsForOphan(
				nonConsentStateForAUS,
			);
			expect(ophanConsentDetails).toEqual({
				consentJurisdiction: 'AUS',
				consentUUID: 'fakeCcpaUUID',
				consent: 'false',
			});
		});
	});

	describe('when consent framework is unknown', () => {
		it('returns the correct consent details', () => {
			const ophanConsentDetails = getConsentDetailsForOphan(failedConsentState);
			expect(ophanConsentDetails).toEqual({
				consentJurisdiction: 'OTHER',
				consentUUID: '',
				consent: '',
			});
		});
	});
});
