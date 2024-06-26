import * as packageExports from './index';

describe('The package', () => {
	it('exports everything it did before', () => {
		expect(Object.keys(packageExports).sort()).toEqual([
			'ArticleDesign',
			'ArticleDisplay',
			'ArticleElementRole',
			'ArticlePillar',
			'ArticleSpecial',
			'Pillar',
			'cmp',
			'countries',
			'debug',
			'getConsentFor',
			'getCookie',
			'getCountryByCountryCode',
			'getLocale',
			'getMeasures',
			'getSwitches',
			'isBoolean',
			'isNonNullable',
			'isObject',
			'isOneOf',
			'isString',
			'isUndefined',
			'joinUrl',
			'loadScript',
			'log',
			'onConsent',
			'onConsentChange',
			'removeCookie',
			'setCookie',
			'setSessionCookie',
			'startPerformanceMeasure',
			'storage',
			'timeAgo',
		]);
	});
});

// test that type exports have not been removed.
// won't catch new types but I don't know how we can?
export type {
	ArticleFormat,
	ArticleTheme,
	Country,
	CountryCode,
	OphanABEvent,
	OphanABPayload,
	OphanABTestMeta,
	OphanAction,
	OphanComponent,
	OphanComponentEvent,
	OphanComponentType,
	OphanProduct,
	Switches,
} from './index';

// @ts-expect-error: make sure the above list are real exports
export type { ThisTypeDoesNotExist } from './index';
