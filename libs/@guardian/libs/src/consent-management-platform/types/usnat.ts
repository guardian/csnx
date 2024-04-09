export interface USNATConsentState {
	doNotSell: boolean;
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
