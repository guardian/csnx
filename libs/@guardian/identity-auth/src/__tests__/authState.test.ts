import type { AccessToken, IDToken } from '../@types/Token';
import { AuthStateManager } from '../authState';
import { Emitter } from '../emitter';
import { Token } from '../token';
import { TokenManager } from '../tokenManager';

jest.mock('../token');

jest.mock('../tokenManager');

describe('IdentityAuth#AuthStateManager', () => {
	let token: Token;
	let emitter: Emitter;
	let tokenManager: TokenManager;
	let authStateManager: AuthStateManager;

	const accessToken: AccessToken = {
		accessToken: 'accessToken',
		claims: {
			aud: 'aud',
			auth_time: 123,
			cid: 'cid',
			email_validated: true,
			exp: 123,
			identity_username: 'identity_username',
			jti: 'jti',
			legacy_identity_id: 'legacy_identity_id',
			scp: ['scp'],
			iat: 123,
			iss: 'iss',
			sub: 'sub',
			uid: 'uid',
			ver: 1,
		},
		expiresAt: 123,
		scopes: ['scp'],
		tokenType: 'tokenType',
	};

	const idToken: IDToken = {
		claims: {
			amr: ['amr'],
			at_hash: 'at_hash',
			aud: 'aud',
			auth_time: 123,
			exp: 123,
			iat: 123,
			identity_username: 'identity_username',
			idp: 'idp',
			iss: 'iss',
			jti: 'jti',
			legacy_identity_id: 'legacy_identity_id',
			name: 'name',
			nonce: 'nonce',
			preferred_username: 'preferred_username',
			sub: 'sub',
			user_groups: ['user_groups'],
			ver: 1,
		},
		expiresAt: 123,
		clientId: 'clientId',
		idToken: 'idToken',
		issuer: 'issuer',
		scopes: ['scp'],
		nonce: 'nonce',
	};

	beforeEach(() => {
		token = new (Token as jest.MockedClass<typeof Token>)(
			{
				clientId: 'test',
				issuer: 'https://profile.theguardian.com/oauth2/test',
				redirectUri: 'test',
				scopes: ['openid', 'profile', 'test'],
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
	});

	it('should update the auth state when tokens are added', () => {
		jest.spyOn(tokenManager, 'getTokensSync').mockImplementation(() => ({
			accessToken,
			idToken,
		}));

		emitter.emit('added');

		tokenManager.getTokensSync();

		expect(authStateManager.getAuthState()).toEqual({
			accessToken,
			idToken,
			isAuthenticated: true,
		});
	});

	it('should update the auth state when tokens are removed', () => {
		jest
			.spyOn(tokenManager, 'getTokensSync')
			.mockImplementation(() => undefined);

		emitter.emit('removed');

		tokenManager.getTokensSync();

		expect(authStateManager.getAuthState()).toEqual({
			accessToken: undefined,
			idToken: undefined,
			isAuthenticated: false,
		});
	});

	it('should return the auth state when no tokens are present', () => {
		expect(authStateManager.getAuthState()).toEqual({
			accessToken: undefined,
			idToken: undefined,
			isAuthenticated: false,
		});
	});
});
