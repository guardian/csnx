import * as packageExports from './index';

describe('The package', () => {
	it('exports everything it did before', () => {
		expect(Object.keys(packageExports).sort()).toEqual([
			'ArticleDesign',
			'ArticleDisplay',
			'ArticleElementRole',
			'ArticlePillar',
			'ArticleSpecial',
			'IdentityAuth',
			'OAuthError',
			'countries',
			'debug',
			'getCookie',
			'getCountryByCountryCode',
			'getLocale',
			'getSwitches',
			'isBoolean',
			'isNonNullable',
			'isObject',
			'isString',
			'isUndefined',
			'joinUrl',
			'loadScript',
			'log',
			'removeCookie',
			'setCookie',
			'setSessionCookie',
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
	IdentityAuthOptions,
	IdentityAuthState,
	AccessToken,
	AccessTokenClaims,
	IDToken,
	IDTokenClaims,
} from './index';

// @ts-expect-error: make sure the above list are real exports
export type { ThisTypeDoesNotExist } from './index';
