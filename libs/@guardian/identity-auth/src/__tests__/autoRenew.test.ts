/* eslint-disable @typescript-eslint/unbound-method -- jest mocks */

import type { IdentityAuthOptions } from '../@types/OAuth';
import { AuthStateManager } from '../authState';
import { AutoRenewService } from '../autoRenew';
import { Emitter } from '../emitter';
import { Token } from '../token';
import { TokenManager } from '../tokenManager';

jest.useFakeTimers();

jest.mock('../authState');
jest.mock('../token');
jest.mock('../tokenManager');

const setVisibilityState = (value: DocumentVisibilityState = 'visible') => {
	Object.defineProperty(document, 'visibilityState', {
		writable: true,
		configurable: true,
		value,
	});
	Object.defineProperty(document, 'hidden', {
		configurable: true,
		get: function () {
			return value === 'hidden';
		},
	});
};

describe('IdentityAuth#AutoRenewService', () => {
	let token: Token;
	let tokenManager: TokenManager;
	let emitter: Emitter;
	let authStateManager: AuthStateManager;

	const options: IdentityAuthOptions = {
		clientId: 'test',
		issuer: 'https://profile.theguardian.com/oauth2/test',
		redirectUri: 'test',
		scopes: ['openid', 'profile', 'test'],
	};

	beforeEach(() => {
		token = new (Token as jest.MockedClass<typeof Token>)(
			{
				...options,
				autoRenew: false,
				renewGracePeriod: 0,
				maxClockSkew: 300,
			},
			{
				authorizeUrl:
					'https://profile.theguardian.com/oauth2/test/v1/authorize',
				tokenUrl: 'https://profile.theguardian.com/oauth2/test/v1/token',
				keysUrl: 'https://profile.theguardian.com/oauth2/test/v1/keys',
			},
		);
		emitter = new Emitter();
		tokenManager = new (TokenManager as jest.MockedClass<typeof TokenManager>)(
			emitter,
			token,
		);
		authStateManager = new AuthStateManager(emitter, tokenManager);
	});

	afterEach(() => {
		jest.clearAllMocks();

		setVisibilityState();
	});

	it('should start the auto renew service', () => {
		const autoRenewService = new AutoRenewService(
			{
				...options,
				autoRenew: true,
				renewGracePeriod: 60,
				maxClockSkew: 300,
			},
			emitter,
			authStateManager,
		);

		authStateManager.getAuthState = jest.fn().mockReturnValue({
			isAuthenticated: false,
		});

		autoRenewService.start();

		expect(autoRenewService.started).toBe(true);
	});

	it('should not start the auto renew service if autoRenew is false', () => {
		const autoRenewService = new AutoRenewService(
			{
				...options,
				autoRenew: false,
				renewGracePeriod: 60,
				maxClockSkew: 300,
			},
			emitter,
			authStateManager,
		);

		autoRenewService.start();

		expect(autoRenewService.started).toBe(false);
	});

	it('should emit a renew event when the token should be renewed', () => {
		const autoRenewService = new AutoRenewService(
			{
				...options,
				autoRenew: true,
				renewGracePeriod: 60,
				maxClockSkew: 300,
			},
			emitter,
			authStateManager,
		);

		authStateManager.getAuthState = jest.fn().mockReturnValue({
			accessToken: {
				expiresAt: 0,
			},
			isAuthenticated: true,
		});

		emitter.emit = jest.fn();

		autoRenewService.start();

		jest.runAllTimers();

		expect(authStateManager.getAuthState).toHaveBeenCalledTimes(1);

		expect(emitter.emit).toHaveBeenCalledTimes(1);
		expect(emitter.emit).toHaveBeenCalledWith('renew');
	});

	it('should handle visibility change within grace period of renewal', () => {
		const mockAddEventListener = jest.spyOn(document, 'addEventListener');

		setVisibilityState('hidden');

		const autoRenewService = new AutoRenewService(
			{
				...options,
				autoRenew: true,
				renewGracePeriod: 60,
				maxClockSkew: 300,
			},
			emitter,
			authStateManager,
		);

		authStateManager.getAuthState = jest.fn().mockReturnValue({
			accessToken: {
				expiresAt: 0,
			},
			isAuthenticated: true,
		});

		emitter.emit = jest.fn();

		autoRenewService.start();

		jest.runAllTimers();

		expect(authStateManager.getAuthState).toHaveBeenCalledTimes(1);

		expect(emitter.emit).toHaveBeenCalledTimes(0);
		expect(mockAddEventListener).toHaveBeenCalledTimes(1);

		setVisibilityState('visible');
		document.dispatchEvent(new Event('visibilitychange'));

		expect(authStateManager.getAuthState).toHaveBeenCalledTimes(2);
		expect(emitter.emit).toHaveBeenCalledTimes(1);
	});

	it('should handle visibility change outside grace period of renewal but has GU_U cookie', () => {
		document.cookie = 'GU_U=value;';

		const mockAddEventListener = jest.spyOn(document, 'addEventListener');

		setVisibilityState('hidden');

		const autoRenewService = new AutoRenewService(
			{
				...options,
				autoRenew: true,
				renewGracePeriod: 60,
				maxClockSkew: 300,
			},
			emitter,
			authStateManager,
		);

		authStateManager.getAuthState = jest
			.fn()
			.mockReturnValueOnce({
				accessToken: {
					expiresAt: 0,
				},
				isAuthenticated: true,
			})
			.mockReturnValueOnce({
				isAuthenticated: false,
			});

		emitter.emit = jest.fn();

		autoRenewService.start();

		jest.runAllTimers();

		expect(authStateManager.getAuthState).toHaveBeenCalledTimes(1);

		expect(emitter.emit).toHaveBeenCalledTimes(0);
		expect(mockAddEventListener).toHaveBeenCalledTimes(1);

		setVisibilityState('visible');
		document.dispatchEvent(new Event('visibilitychange'));

		expect(authStateManager.getAuthState).toHaveBeenCalledTimes(2);
		expect(emitter.emit).toHaveBeenCalledTimes(1);
	});
});
