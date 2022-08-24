import fetchMock from 'jest-fetch-mock';
import * as getCookieForSpy from '../cookies/getCookie';
import { getCookie } from '../cookies/getCookie';
import { removeCookie } from '../cookies/removeCookie';
import { setSessionCookie } from '../cookies/setSessionCookie';
import { storage } from '../storage/storage';
import { __resetCachedValue, getLocale } from './getLocale';

const KEY = 'GU_geo_country';
const KEY_OVERRIDE = 'gu.geo.override';

fetchMock.enableMocks();

describe('getLocale', () => {
	beforeEach(() => {
		storage.local.clear();
		removeCookie({ name: KEY });
		__resetCachedValue();
	});

	it('returns overridden locale if it exists', async () => {
		storage.local.set(KEY_OVERRIDE, 'CY');
		setSessionCookie({ name: KEY, value: 'GB' });
		const locale = await getLocale();
		expect(locale).toBe('CY');
	});

	it('gets a stored valid locale', async () => {
		setSessionCookie({ name: KEY, value: 'CY' });
		const locale = await getLocale();
		expect(locale).toBe('CY');
	});

	it('fetches the remote value if cookie is missing', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({ country: 'CZ' }));
		const locale = await getLocale();
		expect(locale).toBe('CZ');
		expect(getCookie({ name: KEY })).toBe('CZ');
	});

	it('ignores a stored invalid locale', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({ country: 'CZ' }));
		setSessionCookie({ name: KEY, value: 'outerspace' });
		const locale = await getLocale();
		expect(locale).toBe('CZ');
		expect(getCookie({ name: KEY })).toBe('CZ');
	});

	it('ignores an invalid remote response', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({ country: 'outerspace' }));
		const locale = await getLocale();
		expect(locale).toBeNull();
		expect(getCookie({ name: KEY })).toBeNull();
	});

	it('ignores an error in the remote response', async () => {
		fetchMock.mockResponseOnce('regregergreg');
		const locale = await getLocale();
		expect(locale).toBeNull();
		expect(getCookie({ name: KEY })).toBeNull();
	});

	it('uses the cached value if available', async () => {
		const spy = jest.spyOn(getCookieForSpy, 'getCookie');

		setSessionCookie({ name: KEY, value: 'CY' });
		const locale = await getLocale();
		const locale2 = await getLocale();

		expect(locale).toBe(locale2);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(fetchMock).not.toHaveBeenCalled();
	});
});
