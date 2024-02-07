/* istanbul ignore file */

import { version } from '../package.json';
import { CMP as UnifiedCMP } from './consent-management-platform/cmp';
import {
	disable,
	enable,
	isDisabled,
} from './consent-management-platform/disable';
import { getConsentFor as clientGetConsentFor } from './consent-management-platform/getConsentFor';
import { getFramework } from './consent-management-platform/getFramework';
import { onConsent as clientOnConsent } from './consent-management-platform/onConsent';
import { onConsentChange as clientOnConsentChange } from './consent-management-platform/onConsentChange';
import {
	isServerSide,
	cmp as serverCmp,
	getConsentFor as serverGetConsentFor,
	onConsent as serverOnConsent,
	onConsentChange as serverOnConsentChange,
} from './consent-management-platform/server';
import type {
	CMP,
	InitCMP,
	WillShowPrivacyMessage,
} from './consent-management-platform/types';
import { initVendorDataManager } from './consent-management-platform/vendorDataManager';
import type { CountryCode } from './countries/@types/CountryCode';
import { log } from './logger/logger';

//---- consent-management-platform ----//

export * from './deprecated-exports';

export { ArticleElementRole } from './ArticleElementRole/ArticleElementRole';

export { getCookie } from './cookies/getCookie';
export { removeCookie } from './cookies/removeCookie';
export { setCookie } from './cookies/setCookie';
export { setSessionCookie } from './cookies/setSessionCookie';

export type { Country } from './countries/@types/Country';
export type { CountryCode } from './countries/@types/CountryCode';
export { countries } from './countries/countries';
export { getCountryByCountryCode } from './countries/getCountryByCountryCode';

export { timeAgo } from './datetime/timeAgo';

export { ArticleDesign } from './format/ArticleDesign';
export { ArticleDisplay } from './format/ArticleDisplay';
export type { ArticleFormat } from './format/ArticleFormat';
export { ArticleSpecial } from './format/ArticleSpecial';
export type { ArticleTheme } from './format/ArticleTheme';
export { Pillar } from './format/Pillar';

export { isBoolean } from './isBoolean/isBoolean';
export { isNonNullable } from './isNonNullable/isNonNullable';
export { isObject } from './isObject/isObject';
export { isOneOf } from './isOneOf/isOneOf';
export { isString } from './isString/isString';
export { isUndefined } from './isUndefined/isUndefined';

export { joinUrl } from './joinUrl/joinUrl';

export { loadScript } from './loadScript/loadScript';

export { getLocale } from './locale/getLocale';

export { debug } from './logger/debug';
export { log } from './logger/logger';
export type { Subscription } from './logger/@types/logger';

export { startPerformanceMeasure } from './performance/startPerformanceMeasure';
export { getMeasures } from './performance/getMeasures';

export type {
	OphanABEvent,
	OphanABPayload,
	OphanABTestMeta,
	OphanAction,
	OphanComponent,
	OphanComponentEvent,
	OphanComponentType,
	OphanProduct,
} from './ophan/@types';

export { storage } from './storage/storage';

export type { Switches } from './switches/@types/Switches';
export { getSwitches } from './switches/getSwitches';

// Store some bits in the global scope for reuse, in case there's more
// than one instance of the CMP on the page in different scopes.
if (!isServerSide) {
	if (typeof window.guCmpHotFix === 'undefined') window.guCmpHotFix = {};
}

let _willShowPrivacyMessage: undefined | boolean;
let initComplete = false;

let resolveInitialised: (value?: unknown) => void;

const initialised = new Promise((resolve) => {
	resolveInitialised = resolve;
});

const init: InitCMP = ({ pubData, country }) => {
	if (isDisabled() || isServerSide) return;

	if (window.guCmpHotFix.initialised) {
		if (window.guCmpHotFix.cmp?.version !== version) {
			console.warn('Two different versions of the CMP are running:', [
				version,
				window.guCmpHotFix.cmp?.version,
			]);
		}
		return;
	}

	// this is slightly different to initComplete - it's there to
	// prevent another instance of CMP initialising, so we set this true asap.
	// initComplete is set true once we have _finished_ initialising
	window.guCmpHotFix.initialised = true;

	if (typeof country === 'undefined') {
		throw new Error(
			'CMP initialised without `country` property. A 2-letter, ISO ISO_3166-1 country code is required.',
		);
	}

	const framework = getFramework(country as CountryCode);

	UnifiedCMP.init(framework, pubData ?? {});

	void UnifiedCMP.willShowPrivacyMessage().then((willShowValue) => {
		_willShowPrivacyMessage = willShowValue;
		initComplete = true;
		log('cmp', 'initComplete');
	});

	resolveInitialised();

	initVendorDataManager();
};

const willShowPrivacyMessage: WillShowPrivacyMessage = () =>
	initialised.then(() => UnifiedCMP.willShowPrivacyMessage());

const willShowPrivacyMessageSync = () => {
	if (_willShowPrivacyMessage !== undefined) {
		return _willShowPrivacyMessage;
	}
	throw new Error(
		'CMP has not been initialised. Use the async willShowPrivacyMessage() instead.',
	);
};

const hasInitialised = () => initComplete;

const showPrivacyManager = () => {
	void initialised.then(UnifiedCMP.showPrivacyManager);
};

export const cmp: CMP = isServerSide
	? serverCmp
	: (window.guCmpHotFix.cmp ||= {
			init,
			willShowPrivacyMessage,
			willShowPrivacyMessageSync,
			hasInitialised,
			showPrivacyManager,
			version: version,

			// special helper methods for disabling CMP
			__isDisabled: isDisabled,
			__enable: enable,
			__disable: disable,
		});

export const onConsent = isServerSide
	? serverOnConsent
	: (window.guCmpHotFix.onConsent ||= clientOnConsent);
export const onConsentChange = isServerSide
	? serverOnConsentChange
	: (window.guCmpHotFix.onConsentChange ||= clientOnConsentChange);
export const getConsentFor = isServerSide
	? serverGetConsentFor
	: (window.guCmpHotFix.getConsentFor ||= clientGetConsentFor);
