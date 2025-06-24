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
	/** @deprecated Please import from `@guardian/consent-management-platform` */
	OnConsentChangeCallback,
	/** @deprecated Please import from `@guardian/consent-management-platform` */
	CMP,
	/** @deprecated Please import from `@guardian/consent-management-platform` */
	ConsentState,
	/** @deprecated Please import from `@guardian/consent-management-platform` */
	ConsentFramework,
	/** @deprecated Please import from `@guardian/consent-management-platform` */
	VendorName,
} from './consent-management-platform/types';
export type {
	/** @deprecated Please import from `@guardian/consent-management-platform` */
	TCEventStatusCode,
	/** @deprecated Please import from `@guardian/consent-management-platform` */
	TCFv2ConsentState,
} from './consent-management-platform/types/tcfv2';

/** @deprecated Please import from `@guardian/consent-management-platform` */
export type { USNATConsentState } from './consent-management-platform/types/usnat';
export {
	/** @deprecated Please import from `@guardian/consent-management-platform` */
	cmp,
	/** @deprecated Please import from `@guardian/consent-management-platform` */
	getConsentFor,
	/** @deprecated Please import from `@guardian/consent-management-platform` */
	onConsentChange,
	/** @deprecated Please import from `@guardian/consent-management-platform` */
	onConsent,
} from './consent-management-platform';
