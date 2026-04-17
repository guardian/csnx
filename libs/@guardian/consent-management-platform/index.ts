export type {
	CMP,
	ConsentFramework,
	ConsentState,
	OnConsentChangeCallback,
	VendorName,
	OphanConsentDetails,
} from './src/types';
export type { TCEventStatusCode, TCFv2ConsentState } from './src/types/tcfv2';
export type { USNATConsentState } from './src/types/usnat';
export type { AUSConsentState } from './src/types/aus';

export {
	cmp,
	getConsentDetailsForOphan,
	getConsentFor,
	onConsent,
	onConsentChange,
} from './src';
