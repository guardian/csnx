/* istanbul ignore file */

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

export type {
	Callback as OnConsentChangeCallback,
	CMP,
	ConsentState,
	Framework as ConsentFramework,
	VendorName,
} from './consent-management-platform/types';
export type {
	TCEventStatusCode,
	TCFv2ConsentState,
} from './consent-management-platform/types/tcfv2';
export {
	cmp,
	getConsentFor,
	onConsentChange,
	onConsent,
} from './consent-management-platform';
