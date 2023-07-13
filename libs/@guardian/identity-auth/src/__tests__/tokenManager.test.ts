/* eslint-disable @typescript-eslint/unbound-method -- jest mocks */
import { storage } from '@guardian/libs';
import type { AccessToken, IDToken } from '../@types/Token';
import { Emitter } from '../emitter';
import { Token } from '../token';
import { TokenManager } from '../tokenManager';

jest.mock('../token');

const mockedSetLocal = jest.spyOn(storage.local, 'set');
const mockedGetLocal = jest.spyOn(storage.local, 'get');
const mockedRemoveLocal = jest.spyOn(storage.local, 'remove');

describe('IdentityAuth#TokenManager', () => {
	let emitter: Emitter;
	let token: Token;
	let tokenManager: TokenManager;

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
		emitter = new Emitter();
		token = token = new (Token as jest.MockedClass<typeof Token>)(
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
		tokenManager = new TokenManager(emitter, token);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should set the tokens in storage', () => {
		tokenManager.setTokens({
			accessToken,
			idToken,
		});

		expect(mockedGetLocal).toHaveBeenCalledTimes(2);
		expect(mockedSetLocal).toHaveBeenCalledTimes(2);
		expect(mockedSetLocal).toHaveBeenCalledWith(
			'gu.access_token',
			accessToken,
			new Date(accessToken.expiresAt * 1000),
		);
		expect(mockedSetLocal).toHaveBeenCalledWith(
			'gu.id_token',
			idToken,
			new Date(idToken.expiresAt * 1000),
		);
	});

	it('should get the tokens from storage', () => {
		tokenManager.getTokensSync();
		expect(mockedGetLocal).toHaveBeenCalledTimes(2);
		expect(mockedGetLocal).toHaveBeenCalledWith('gu.access_token');
		expect(mockedGetLocal).toHaveBeenCalledWith('gu.id_token');
	});

	it('should remove the tokens from storage', () => {
		tokenManager.clear();
		expect(mockedRemoveLocal).toHaveBeenCalledTimes(2);
		expect(mockedRemoveLocal).toHaveBeenCalledWith('gu.access_token');
		expect(mockedRemoveLocal).toHaveBeenCalledWith('gu.id_token');
	});

	it('should refresh the tokens on get if params are passed', async () => {
		jest.spyOn(token, 'getWithoutPrompt').mockImplementation(() =>
			Promise.resolve({
				state: 'state',
				tokens: {
					accessToken,
					idToken,
				},
			}),
		);

		const tokens = await tokenManager.getTokens({ refreshIfRequired: true });

		expect(tokens).toEqual({
			accessToken,
			idToken,
		});

		expect(token.getWithoutPrompt).toHaveBeenCalledTimes(1);
	});

	it('should renew the tokens if renew is called', async () => {
		jest.spyOn(token, 'getWithoutPrompt').mockImplementation(() =>
			Promise.resolve({
				state: 'state',
				tokens: {
					accessToken,
					idToken,
				},
			}),
		);

		tokenManager.setTokens = jest.fn();

		const tokens = await tokenManager.renew();

		expect(tokens).toEqual({
			accessToken,
			idToken,
		});

		expect(token.getWithoutPrompt).toHaveBeenCalledTimes(1);
		expect(tokenManager.setTokens).toHaveBeenCalledTimes(1);
	});
});
