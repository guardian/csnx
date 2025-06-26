export interface AUSConsentState {
	personalisedAdvertising: boolean;
}

export interface AUSData {
	version: number;
	uspString: string;
}

export interface GlobalEnterpriseCategory {
	_id: string;
	systemId: number;
	consented: boolean;
}

export interface GlobalEnterpriseVendor {
	_id: string;
	consented: boolean;
}

export interface GlobalEnterpriseConsents {
	applies: boolean;
	categories: GlobalEnterpriseCategory[];
	vendors: GlobalEnterpriseVendor[];
}
