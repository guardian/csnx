export interface USNATConsentState {
	doNotSell: boolean;
	signalStatus: GPPSignalStatus;
}

export type GPPSignalStatus = 'not ready' | 'ready';

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
	signalStatus: GPPSignalStatus;
}
