/* eslint-disable @typescript-eslint/unbound-method -- jest mocks */
import { jest } from '@jest/globals';

jest.unstable_mockModule('@guardian/libs', () => ({
	getCookie: jest.fn(),
	storage: {
		local: {
			set: jest.fn(),
			get: jest.fn(),
			isAvailable: jest.fn(),
		},
	},
}));

const libs = await import('@guardian/libs');
const { cookieRefreshIfRequired } = await import('../cookieRefresh');

const mockedSetLocal = jest.mocked(libs.storage.local.set);
const mockedGetLocal = jest.mocked(libs.storage.local.get);
const mockedLocalIsAvailable = jest.mocked(libs.storage.local.isAvailable);
const mockedGetCookie = jest.mocked(libs.getCookie);

describe('IdentityAuth#CookieRefresh', () => {
	const { location } = window;

	beforeAll(() => {
		// @ts-expect-error -- mocking window location
		delete window.location;
		// @ts-expect-error -- mocking window location
		window.location = { replace: jest.fn() };
	});

	afterAll(() => {
		Object.defineProperty(window, 'location', {
			value: location,
			writable: true,
		});
	});

	it('mocks `location.replace`', () => {
		expect(jest.isMockFunction(window.location.replace)).toBe(true);
	});

	it('should not refresh if not enabled', () => {
		cookieRefreshIfRequired(
			false,
			'https://profile.thegulocal.com/oauth2/test',
		);

		expect(mockedLocalIsAvailable).not.toHaveBeenCalled();
		expect(mockedGetCookie).not.toHaveBeenCalled();
		expect(mockedGetLocal).not.toHaveBeenCalled();
		expect(mockedSetLocal).not.toHaveBeenCalled();
		expect(window.location.replace).not.toHaveBeenCalled();
	});

	it('should not refresh if storage is not available', () => {
		mockedLocalIsAvailable.mockReturnValue(false);

		cookieRefreshIfRequired(true, 'https://profile.thegulocal.com/oauth2/test');

		expect(mockedLocalIsAvailable).toHaveBeenCalledTimes(1);
		expect(mockedGetCookie).not.toHaveBeenCalled();
		expect(mockedGetLocal).not.toHaveBeenCalled();
		expect(mockedSetLocal).not.toHaveBeenCalled();
		expect(window.location.replace).not.toHaveBeenCalled();
	});

	it('should not refresh if GU_U cookie is not present', () => {
		mockedLocalIsAvailable.mockReturnValue(true);
		mockedGetCookie.mockReturnValue(null);

		cookieRefreshIfRequired(true, 'https://profile.thegulocal.com/oauth2/test');
		expect(mockedLocalIsAvailable).toHaveBeenCalledTimes(1);
		expect(mockedGetCookie).toHaveBeenCalledTimes(1);
		expect(mockedGetCookie).toHaveBeenCalledWith({
			name: 'GU_U',
			shouldMemoize: true,
		});
		expect(mockedGetLocal).not.toHaveBeenCalled();
		expect(mockedSetLocal).not.toHaveBeenCalled();
		expect(window.location.replace).not.toHaveBeenCalled();
	});

	it('should not refresh if lastRefresh if valid and less than 30 days old', () => {
		const now = Date.now();
		const lastRefresh = new Date(now - 1000 * 60 * 60 * 24 * 29).getTime(); // 29 days ago

		mockedLocalIsAvailable.mockReturnValue(true);
		mockedGetCookie.mockReturnValue('cookie');
		mockedGetLocal.mockReturnValue(lastRefresh);

		cookieRefreshIfRequired(true, 'https://profile.thegulocal.com/oauth2/test');
		expect(mockedLocalIsAvailable).toHaveBeenCalledTimes(1);
		expect(mockedGetCookie).toHaveBeenCalledTimes(1);
		expect(mockedGetCookie).toHaveBeenCalledWith({
			name: 'GU_U',
			shouldMemoize: true,
		});
		expect(mockedGetLocal).toHaveBeenCalledTimes(1);
		expect(mockedSetLocal).not.toHaveBeenCalled();
		expect(window.location.replace).not.toHaveBeenCalled();
	});

	it('should refresh if lastRefresh is valid and more than 30 days old', () => {
		const now = Date.now();
		const lastRefresh = new Date(now - 1000 * 60 * 60 * 24 * 31).getTime(); // 31 days ago

		mockedLocalIsAvailable.mockReturnValue(true);
		mockedGetCookie.mockReturnValue('cookie');
		mockedGetLocal.mockReturnValue(lastRefresh);

		cookieRefreshIfRequired(true, 'https://profile.thegulocal.com/oauth2/test');
		expect(mockedLocalIsAvailable).toHaveBeenCalledTimes(1);
		expect(mockedGetCookie).toHaveBeenCalledTimes(1);
		expect(mockedGetCookie).toHaveBeenCalledWith({
			name: 'GU_U',
			shouldMemoize: true,
		});
		expect(mockedGetLocal).toHaveBeenCalledTimes(1);
		expect(mockedSetLocal).toHaveBeenCalledTimes(1);
		expect(mockedSetLocal).toHaveBeenCalledWith(
			'identity.lastRefresh',
			expect.any(Number),
			expect.any(Number),
		);
		expect(window.location.replace).toHaveBeenCalledTimes(1);
		expect(window.location.replace).toHaveBeenCalledWith(
			'https://profile.thegulocal.com/signin/refresh?returnUrl=http%3A%2F%2Flocalhost%2F',
		);
	});

	it('should refresh if lastRefresh is invalid', () => {
		mockedLocalIsAvailable.mockReturnValue(true);
		mockedGetCookie.mockReturnValue('cookie');
		mockedGetLocal.mockReturnValue('unknown');

		cookieRefreshIfRequired(true, 'https://profile.thegulocal.com/oauth2/test');
		expect(mockedLocalIsAvailable).toHaveBeenCalledTimes(1);
		expect(mockedGetCookie).toHaveBeenCalledTimes(1);
		expect(mockedGetCookie).toHaveBeenCalledWith({
			name: 'GU_U',
			shouldMemoize: true,
		});
		expect(mockedGetLocal).toHaveBeenCalledTimes(1);
		expect(mockedSetLocal).toHaveBeenCalledTimes(1);
		expect(mockedSetLocal).toHaveBeenCalledWith(
			'identity.lastRefresh',
			expect.any(Number),
			expect.any(Number),
		);
		expect(window.location.replace).toHaveBeenCalledTimes(1);
		expect(window.location.replace).toHaveBeenCalledWith(
			'https://profile.thegulocal.com/signin/refresh?returnUrl=http%3A%2F%2Flocalhost%2F',
		);
	});

	it('should refresh if lastRefresh does not exist', () => {
		mockedLocalIsAvailable.mockReturnValue(true);
		mockedGetCookie.mockReturnValue('cookie');
		mockedGetLocal.mockReturnValue(null);

		cookieRefreshIfRequired(true, 'https://profile.thegulocal.com/oauth2/test');
		expect(mockedLocalIsAvailable).toHaveBeenCalledTimes(1);
		expect(mockedGetCookie).toHaveBeenCalledTimes(1);
		expect(mockedGetCookie).toHaveBeenCalledWith({
			name: 'GU_U',
			shouldMemoize: true,
		});
		expect(mockedGetLocal).toHaveBeenCalledTimes(1);
		expect(mockedSetLocal).toHaveBeenCalledTimes(1);
		expect(mockedSetLocal).toHaveBeenCalledWith(
			'identity.lastRefresh',
			expect.any(Number),
			expect.any(Number),
		);
		expect(window.location.replace).toHaveBeenCalledTimes(1);
		expect(window.location.replace).toHaveBeenCalledWith(
			'https://profile.thegulocal.com/signin/refresh?returnUrl=http%3A%2F%2Flocalhost%2F',
		);
	});
});
