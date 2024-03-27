export type TCFv2ConsentList = Record<string, boolean>;

export interface TCFv2ConsentState {
	consents: TCFv2ConsentList;
	eventStatus: TCEventStatusCode;
	vendorConsents: TCFv2ConsentList;
	addtlConsent: string;
	gdprApplies: boolean | undefined;
	tcString: string;
}

export type ConsentVector = Record<string, boolean>;

// From the IAB spec – https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md
export type TCEventStatusCode =
	| 'tcloaded'
	| 'cmpuishown'
	| 'useractioncomplete';

// From the IAB spec – https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md
export type TCPingStatusCode =
	| 'stub'
	| 'loading'
	| 'loaded'
	| 'error'
	| 'visible'
	| 'hidden'
	| 'disabled';
