export interface USNATConsentState {
	doNotSell: boolean;
	signalStatus: GPPSignalStatus;
}

type GPPSignalStatus = 'not ready' | 'ready';

type GppParsedSections = Record<
	string,
	{
		Version: number;
		SaleOptOut: number;
		Gpc: boolean;
	}
>;

export interface GPPData {
	gppVersion: number;
	gppString: string;
	applicableSections: number[];
	supportedAPIs: string[];
	parsedSections: GppParsedSections;
	signalStatus: GPPSignalStatus;
	gpcEnabled: boolean;
}
