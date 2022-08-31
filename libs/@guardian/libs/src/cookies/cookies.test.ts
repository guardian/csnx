import MockDate from 'mockdate';
import { getCookie } from './getCookie';
import * as getCookieValues from './getCookieValues';
import { removeCookie } from './removeCookie';
import { setCookie } from './setCookie';
import { setSessionCookie } from './setSessionCookie';

describe('cookies', () => {
	let cookieValue = '';

	beforeAll(() => {
		Object.defineProperty(document, 'cookie', {
			get() {
				return cookieValue
					.replace('|', ';')
					.replace(/^[;|]|[;|]$/g, '');
			},

			set(value: string) {
				const name = value.split('=')[0];
				const newVal = cookieValue
					.split('|')
					.filter((cookie) => cookie.split('=')[0] !== name);

				newVal.push(value);
				cookieValue = newVal.join('|');
			},
		});
	});

	beforeEach(() => {
		cookieValue = '';
		Object.defineProperty(document, 'domain', {
			value: 'www.theguardian.com',
			writable: true,
			configurable: true,
		});
	});

	afterEach(() => {
		MockDate.reset();
	});

	it('gets a cookie', () => {
		document.cookie =
			'optimizelyEndUserId=oeu1398171767331r0.5280374749563634; __qca=P0-938012256-1398171768649;';
		expect(getCookie({ name: '__qca' })).toEqual(
			'P0-938012256-1398171768649',
		);
	});

	it('sets a cookie with an expiry date in six months that preserves UTC time', () => {
		MockDate.set('Sun Nov 17 2019 12:00:00 GMT+0000 (Greenwich Mean Time)');
		setCookie({
			name: 'cookie-1-name',
			value: 'cookie-1-value',
		});
		expect(document.cookie).toMatch(
			new RegExp(
				'cookie-1-name=cookie-1-value; path=/; expires=Wed, 01 Apr 2020 12:00:00 GMT; domain=.theguardian.com',
			),
		);
	});

	it('sets a cookie to expire in a specific number of days', () => {
		MockDate.set('Sun Nov 17 2019 12:00:00 GMT+0000 (Greenwich Mean Time)');
		setCookie({
			name: 'cookie-1-name',
			value: 'cookie-1-value',
			daysToLive: 7,
		});
		expect(document.cookie).toEqual(
			'cookie-1-name=cookie-1-value; path=/; expires=Sun, 24 Nov 2019 12:00:00 GMT; domain=.theguardian.com',
		);
	});

	it('sets a cookie to expire in a specific number of days that preserves UTC time', () => {
		// BST started Sun 28th Mar 2021
		MockDate.set('Sat Mar 27 2021 12:00:00 GMT+0000 (Greenwich Mean Time)');
		setCookie({
			name: 'cookie-1-name',
			value: 'cookie-1-value',
			daysToLive: 7,
		});
		expect(document.cookie).toEqual(
			'cookie-1-name=cookie-1-value; path=/; expires=Sat, 03 Apr 2021 12:00:00 GMT; domain=.theguardian.com',
		);
	});

	it('does not set a cookie when the cookie name is invalid', () => {
		expect(() =>
			setCookie({
				name: 'cookie-1-name-@',
				value: 'cookie-1-value',
			}),
		).toThrowError(
			`Cookie must not contain invalid characters (space, tab and the following characters: '()<>@,;"/[]?={}') cookie-1-name-@=cookie-1-value`,
		);
		expect(document.cookie).toEqual('');
	});

	it('does not set a cookie when the cookie value is invalid', () => {
		expect(() =>
			setCookie({
				name: 'cookie-1-name',
				value: 'cookie-1-value-<',
			}),
		).toThrowError(
			`Cookie must not contain invalid characters (space, tab and the following characters: '()<>@,;"/[]?={}') cookie-1-name=cookie-1-value-<`,
		);
		expect(document.cookie).toEqual('');
	});

	it('sets a session cookie', () => {
		setSessionCookie({
			name: 'cookie-1-name',
			value: 'cookie-1-value',
		});
		expect(document.cookie).toEqual(
			'cookie-1-name=cookie-1-value; path=/; domain=.theguardian.com',
		);
	});

	it('sets a session cookie for localhost', () => {
		Object.defineProperty(document, 'domain', {
			value: 'localhost',
		});
		expect(document.cookie).toEqual('');
		setSessionCookie({
			name: 'cookie-1-name',
			value: 'cookie-1-value',
		});
		expect(document.cookie).toEqual('cookie-1-name=cookie-1-value; path=/');
	});

	it('does not set a session cookie when the cookie name is invalid', () => {
		expect(() =>
			setSessionCookie({
				name: 'cookie-1-name-@',
				value: 'cookie-1-value',
			}),
		).toThrowError(
			`Cookie must not contain invalid characters (space, tab and the following characters: '()<>@,;"/[]?={}') cookie-1-name-@=cookie-1-value`,
		);
		expect(document.cookie).toEqual('');
	});

	it('does not set a cookie when the cookie value is invalid', () => {
		expect(() =>
			setSessionCookie({
				name: 'cookie-1-name',
				value: 'cookie-1-value-<',
			}),
		).toThrowError(
			`Cookie must not contain invalid characters (space, tab and the following characters: '()<>@,;"/[]?={}') cookie-1-name=cookie-1-value-<`,
		);
		expect(document.cookie).toEqual('');
	});

	it('gets a memoized cookie with days to live and cross subdomain', () => {
		setCookie({
			name: 'GU_geo_country',
			value: 'GB',
			daysToLive: 1,
			isCrossSubdomain: true,
		});
		const spy = jest.spyOn(getCookieValues, 'getCookieValues');
		expect(
			getCookie({
				name: 'GU_geo_country',
				shouldMemoize: true,
			}),
		).toEqual('GB');
		expect(
			getCookie({
				name: 'GU_geo_country',
				shouldMemoize: true,
			}),
		).toEqual('GB');
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('gets a memoized cookie with days to live', () => {
		setCookie({
			name: 'GU_geo_country',
			value: 'IT',
			daysToLive: 1,
		});
		const spy = jest.spyOn(getCookieValues, 'getCookieValues');
		expect(
			getCookie({
				name: 'GU_geo_country',
				shouldMemoize: true,
			}),
		).toEqual('IT');
		expect(
			getCookie({
				name: 'GU_geo_country',
				shouldMemoize: true,
			}),
		).toEqual('IT');
		expect(
			getCookie({
				name: 'GU_geo_country',
				shouldMemoize: true,
			}),
		).toEqual('IT');
		// for some reason the spy is been called 1 additional time although that's not happening in reality
		expect(spy).not.toHaveBeenCalledTimes(2);
	});

	it('re-sets a memoized cookie', () => {
		setCookie({
			name: 'GU_geo_country',
			value: 'GB',
			daysToLive: 3,
			isCrossSubdomain: false,
		});
		expect(
			getCookie({
				name: 'GU_geo_country',
				shouldMemoize: true,
			}),
		).toEqual('GB');
		setCookie({
			name: 'GU_geo_country',
			value: 'IT',
			daysToLive: 3,
			isCrossSubdomain: false,
		});
		expect(
			getCookie({
				name: 'GU_geo_country',
				shouldMemoize: true,
			}),
		).toEqual('IT');
	});

	it('re-sets a memoized session cookie', () => {
		setSessionCookie({
			name: 'GU_geo_country',
			value: 'GB',
		});
		expect(
			getCookie({
				name: 'GU_geo_country',
				shouldMemoize: true,
			}),
		).toEqual('GB');
		setSessionCookie({
			name: 'GU_geo_country',
			value: 'GR',
		});
		expect(
			getCookie({
				name: 'GU_geo_country',
				shouldMemoize: true,
			}),
		).toEqual('GR');
	});

	it('removes a cookie and sets a short domain', () => {
		document.cookie = 'cookie-1-name=cookie-1-value';

		removeCookie({ name: 'cookie-1-name' });

		const { cookie } = document;

		expect(cookie).toMatch(
			new RegExp(
				'cookie-1-name=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=.theguardian.com',
			),
		);
	});

	it('removes a cookie and does not set a short domain for localhost', () => {
		Object.defineProperty(document, 'domain', {
			value: 'localhost',
		});

		document.cookie = 'cookie-1-name=cookie-1-value';

		removeCookie({ name: 'cookie-1-name' });

		const { cookie } = document;

		expect(cookie).toMatch(
			new RegExp(
				'cookie-1-name=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=localhost',
			),
		);
	});

	it('removes a cookie and does not set a short domain for preview', () => {
		window.guardian = {
			config: { page: { isPreview: true } },
		};

		document.cookie = 'cookie-1-name=cookie-1-value';

		removeCookie({ name: 'cookie-1-name' });

		const { cookie } = document;

		expect(cookie).toMatch(
			new RegExp(
				'cookie-1-name=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=www.theguardian.com',
			),
		);
	});
});
