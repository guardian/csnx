export interface CCPAConsentState {
	doNotSell: boolean;
}

export interface CCPAData {
	version: number;
	uspString: string;
}

type GppParsedSections = Record<
	string,
	{
		Version: number;
		SaleOptOut: number;
	}
>;

export interface GPPData {
	gppVersion: number;
	gppString: string;
	applicableSections: number[];
	supportedAPIs: string[];
	parsedSections: GppParsedSections;
}
