export type {
	OnConsentChangeCallback,
	CMP,
	ConsentState,
	ConsentFramework,
	VendorName,
} from './src/types';
export type { TCEventStatusCode, TCFv2ConsentState } from './src/types/tcfv2';
export type { USNATConsentState } from './src/types/usnat';
export { cmp, getConsentFor, onConsentChange, onConsent } from './src';
