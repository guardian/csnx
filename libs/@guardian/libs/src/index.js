/* istanbul ignore file */

export { ArticleElementRole } from './ArticleElementRole/ArticleElementRole.js';

export { getCookie } from './cookies/getCookie.js';
export { removeCookie } from './cookies/removeCookie.js';
export { setCookie } from './cookies/setCookie.js';
export { setSessionCookie } from './cookies/setSessionCookie.js';

/** @typedef {import('./countries/countries.js').Country} Country */
/** @typedef {import('./countries/countries.js').CountryCode} CountryCode */
export { countries } from './countries/countries.js';
export { getCountryByCountryCode } from './countries/getCountryByCountryCode.js';

export { timeAgo } from './datetime/timeAgo.js';

/** @typedef {import('./format/ArticleFormat.js').ArticleFormat} ArticleFormat */
export { ArticleDesign } from './format/ArticleDesign.js';
export { ArticleDisplay } from './format/ArticleDisplay.js';
export { ArticlePillar } from './format/ArticlePillar.js';
export { ArticleSpecial } from './format/ArticleSpecial.js';
export { ArticleTheme } from './format/ArticleTheme.js';

export { isBoolean } from './isBoolean/isBoolean.js';
export { isNonNullable } from './isNonNullable/isNonNullable.js';
export { isObject } from './isObject/isObject.js';
export { isString } from './isString/isString.js';
export { isUndefined } from './isUndefined/isUndefined.js';

export { joinUrl } from './joinUrl/joinUrl.js';

export { loadScript } from './loadScript/loadScript.js';

export { getLocale } from './locale/getLocale.js';

export { debug } from './logger/debug.js';
export { log } from './logger/log.js';
/** @typedef {import('./logger/teamStyles.js').TeamName} TeamName */

/** @typedef {import('./ophan/@types').OphanABEvent} OphanABEvent */
/** @typedef {import('./ophan/@types').OphanABPayload} OphanABPayload */
/** @typedef {import('./ophan/@types').OphanABTestMeta} OphanABTestMeta */
/** @typedef {import('./ophan/@types').OphanAction} OphanAction */
/** @typedef {import('./ophan/@types').OphanComponent} OphanComponent */
/** @typedef {import('./ophan/@types').OphanComponentEvent} OphanComponentEvent */
/** @typedef {import('./ophan/@types').OphanComponentType} OphanComponentType */
/** @typedef {import('./ophan/@types').OphanProduct} OphanProduct */

export { storage } from './storage/storage.js';

/** @typedef {import('./switches/getSwitches.js').Switches} Switches */
export { getSwitches } from './switches/getSwitches.js';
