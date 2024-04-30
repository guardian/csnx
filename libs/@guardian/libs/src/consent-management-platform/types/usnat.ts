export interface USNATConsentState {
	doNotSell: boolean;
	cmpStatus: string;
	signalStatus: string;
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
	signalStatus: string;
	cmpDisplayStatus: string;
}
