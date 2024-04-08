export interface CCPAConsentState {
	doNotSell: boolean;
}

export interface CCPAData {
	version: number;
	uspString: string;
}

interface GppParsedSections {
	usnatv1?: {
		Version: number;
		SaleOptOut: number;
	};
}

export interface GPPData {
	gppVersion: number;
	gppString: string;
	applicableSections: number[];
	parsedSections: GppParsedSections;
}
