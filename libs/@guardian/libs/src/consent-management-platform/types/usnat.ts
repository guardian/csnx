export interface USNATConsentState {
	doNotSell: boolean;
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
