import type { onConsent as OnConsent } from './onConsent';
import type {
	CMP,
	ConsentState,
	GetConsentFor,
	OnConsentChange,
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
