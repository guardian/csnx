import type { onConsent as OnConsent } from './onConsent';
import type {
	CMP,
	ConsentState,
	GetConsentFor,
	OnConsentChange,
	OphanConsentDetails,
	VendorName,
} from './types';

export const isServerSide = typeof window === 'undefined';

export const serverSideWarn = (): void => {
	console.warn(
		'This is a server-side version of the @guardian/consent-management-platform',
		'No consent signals will be received.',
	);
};

export const serverSideWarnAndReturn = <T>(arg: T): (() => T) => {
	return () => {
		serverSideWarn();
		return arg;
	};
};

export const cmp: CMP = {
	__disable: serverSideWarn,
	__enable: serverSideWarnAndReturn(false),
	__isDisabled: serverSideWarnAndReturn(false),

	hasInitialised: serverSideWarnAndReturn(false),
	init: serverSideWarn,
	showPrivacyManager: serverSideWarn,
	version: 'n/a',
	willShowPrivacyMessage: serverSideWarnAndReturn(Promise.resolve(false)),
	willShowPrivacyMessageSync: serverSideWarnAndReturn(false),
};

export const onConsent = (): ReturnType<typeof OnConsent> => {
	serverSideWarn();
	return Promise.resolve({
		canTarget: false,
		framework: null,
	});
};

export const onConsentChange: OnConsentChange = () => {
	return serverSideWarn();
};

export const getConsentDetailsForOphan = (
	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- consentState is not used in the server-side implementation, but we want to keep the same function signature.
	consentState: ConsentState,
): OphanConsentDetails => {
	serverSideWarn();
	return {
		consentJurisdiction: 'OTHER',
		consentUUID: '',
		consent: '',
	};
};

export const getConsentFor: GetConsentFor = (
	vendor: VendorName,
	consent: ConsentState,
) => {
	console.log(
		`Server-side call for getConsentFor(${vendor}, ${JSON.stringify(consent)})`,
		'getConsentFor will always return false server-side',
	);
	serverSideWarn();

	return false;
};
