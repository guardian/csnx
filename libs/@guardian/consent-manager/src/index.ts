export type {
	CMP,
	ConsentFramework,
	ConsentState,
	OnConsentChangeCallback,
	VendorName,
	OphanConsentDetails,
} from './types';
export type { TCEventStatusCode, TCFv2ConsentState } from './types/tcfv2';
export type { USNATConsentState } from './types/usnat';
export type { AUSConsentState } from './types/aus';

export {
	cmp,
	getConsentDetailsForOphan,
	getConsentFor,
	onConsent,
	onConsentChange,
} from './export';
