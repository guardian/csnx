/**
 * DEPRECATED EXPORTS
 *
 * To be removed from the public interface in the next major version.
 */

import { Pillar } from './format/Pillar';
import { type Subscription } from './logger/@types/logger';

/** @deprecated Use `Pillar` instead. */
export const ArticlePillar = Pillar;

/** @deprecated Use `Subscription` instead. */
export type TeamName = Subscription;

export type {
	/** @deprecated Please import from `@guardian/cmp` */
	OnConsentChangeCallback,
	/** @deprecated Please import from `@guardian/cmp` */
	CMP,
	/** @deprecated Please import from `@guardian/cmp` */
	ConsentState,
	/** @deprecated Please import from `@guardian/cmp` */
	ConsentFramework,
	/** @deprecated Please import from `@guardian/cmp` */
	VendorName,
} from './consent-management-platform/types';
export type {
	/** @deprecated Please import from `@guardian/cmp` */
	TCEventStatusCode,
	/** @deprecated Please import from `@guardian/cmp` */
	TCFv2ConsentState,
} from './consent-management-platform/types/tcfv2';

/** @deprecated Please import from `@guardian/cmp` */
export type { USNATConsentState } from './consent-management-platform/types/usnat';
export {
	/** @deprecated Please import from `@guardian/cmp` */
	cmp,
	/** @deprecated Please import from `@guardian/cmp` */
	getConsentFor,
	/** @deprecated Please import from `@guardian/cmp` */
	onConsentChange,
	/** @deprecated Please import from `@guardian/cmp` */
	onConsent,
} from './consent-management-platform';
