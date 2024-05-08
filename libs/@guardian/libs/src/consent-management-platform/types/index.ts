import type { CountryCode } from '../../countries/@types/CountryCode';
import type { VendorName } from '../vendors';
import type { AUSConsentState } from './aus';
import type { TCFv2ConsentState } from './tcfv2';
import type { USNATConsentState } from './usnat';

export type ConsentFramework = 'tcfv2' | 'ccpa' | 'aus' | 'usnat'; // TODO: Remove ccpa but look how consumers use

export type CMP = {
	init: InitCMP;
	willShowPrivacyMessage: WillShowPrivacyMessage;
	willShowPrivacyMessageSync: () => boolean;
	hasInitialised: () => boolean;
	showPrivacyManager: () => void;
	version: string;
	__isDisabled: () => boolean;
	__disable: () => void;
	__enable: () => void;
};

export type InitCMP = (arg0: {
	pubData?: PubData;
	country?: CountryCode;
}) => void;

export type OnConsentChange = (
	fn: OnConsentChangeCallback,
	final?: boolean,
) => void;
export type GetConsentFor = (
	vendor: VendorName,
	consent: ConsentState,
) => boolean;

export interface ConsentState {
	tcfv2?: TCFv2ConsentState;
	ccpa?: USNATConsentState; // TODO : mark as deprecated go to usant
	usnat?: USNATConsentState;
	aus?: AUSConsentState;
	gpcSignal?: boolean;
	canTarget: boolean;
	framework: ConsentFramework | null; // TODO
}
export interface PubData {
	browserId?: string;
	pageViewId?: string;
	[propName: string]: unknown;
}
export interface SourcepointImplementation {
	init: (framework: ConsentFramework, pubData?: PubData) => void;
	willShowPrivacyMessage: WillShowPrivacyMessage;
	showPrivacyManager: () => void;
}
export type WillShowPrivacyMessage = () => Promise<boolean>;

export type OnConsentChangeCallback = (arg0: ConsentState) => void;
export type CallbackQueueItem = {
	fn: OnConsentChangeCallback;
	lastState?: string;
};

// https://documentation.sourcepoint.com/web-implementation/sourcepoint-gdpr-and-tcf-v2-support/__tcfapi-getcustomvendorconsents-api
export interface VendorConsents {
	grants: Record<
		string,
		{
			purposeGrants: Record<number, boolean>;
			vendorGrant: boolean;
		}
	>;
}

export type { VendorName };
