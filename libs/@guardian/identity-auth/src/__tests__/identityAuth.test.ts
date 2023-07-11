import type { AccessToken, CustomClaims, IDToken } from '../@types/Token';
import { IdentityAuth } from '../index';

jest.mock('../authState');
jest.mock('../tokenManager');
jest.mock('../token');
jest.mock('../crypto');

describe('IdentityAuth', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return access and id token default claims', async () => {
		const auth = new IdentityAuth({
			clientId: 'test',
			issuer: 'https://profile.theguardian.com/oauth2/test',
			redirectUri: 'test',
			scopes: ['openid', 'profile', 'test'],
			autoRenew: false,
		});

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

		jest.spyOn(auth, 'isSignedInWithAuthState').mockImplementation(() =>
			Promise.resolve({
				accessToken,
				idToken: idToken,
				isAuthenticated: true,
			}),
		);

		const authState = await auth.isSignedInWithAuthState();

		expect(authState.accessToken?.claims.email_validated).toBeDefined();
		expect(authState.idToken?.claims.user_groups).toBeDefined();
	});

	it('should return access and id token custom claims', async () => {
		type CustomAccessTokenClaims = CustomClaims & {
			foo: string;
		};

		type CustomIdTokenClaims = CustomClaims & {
			bar: number[];
			baz: boolean;
		};

		const auth = new IdentityAuth<CustomAccessTokenClaims, CustomIdTokenClaims>(
			{
				clientId: 'test',
				issuer: 'https://profile.theguardian.com/oauth2/test',
				redirectUri: 'test',
				scopes: ['openid', 'profile', 'test'],
				autoRenew: false,
			},
		);

		const accessToken: AccessToken<CustomAccessTokenClaims> = {
			accessToken: 'accessToken',
			claims: {
				aud: 'aud',
				auth_time: 123,
				cid: 'cid',
				email_validated: true,
				exp: 123,
				foo: 'foo',
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

		const idToken: IDToken<CustomIdTokenClaims> = {
			claims: {
				amr: ['amr'],
				at_hash: 'at_hash',
				aud: 'aud',
				auth_time: 123,
				bar: [123, 123],
				baz: true,
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

		jest.spyOn(auth, 'isSignedInWithAuthState').mockImplementation(() =>
			Promise.resolve({
				accessToken,
				idToken: idToken,
				isAuthenticated: true,
			}),
		);

		const authState = await auth.isSignedInWithAuthState();

		expect(authState.accessToken?.claims.foo).toBeDefined();
		expect(authState.idToken?.claims.bar).toBeDefined();
	});
});
