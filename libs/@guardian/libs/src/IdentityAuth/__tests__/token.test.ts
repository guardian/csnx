import fetchMock from 'jest-fetch-mock';
import type {
	AuthorizeParams,
	IdentityAuthOptions,
	OAuthUrls,
} from '../@types/OAuth';
import type { JWTPayload } from '../@types/Token';
import * as TokenModule from '../token';

fetchMock.enableMocks();

describe('IdentityAuth#Token', () => {
	const authorizeParams: AuthorizeParams = {
		client_id: 'test',
		redirect_uri: 'test',
		scope: 'test',
		state: 'state',
		code_challenge: 'code_challenge',
		code_challenge_method: 'S256',
		prompt: 'none',
		response_mode: 'okta_post_message',
		response_type: 'code',
		nonce: 'nonce',
	};
	const options: IdentityAuthOptions = {
		clientId: 'test',
		issuer: 'https://profile.theguardian.com/oauth2/test',
		redirectUri: 'test',
		scopes: ['openid', 'profile', 'test'],
	};
	const oauthUrls: OAuthUrls = {
		authorizeUrl: 'https://profile.theguardian.com/oauth2/test/v1/authorize',
		tokenUrl: 'https://profile.theguardian.com/oauth2/test/v1/token',
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should perform auth code flow in iframe and return OAuthAuthorizeResponse', async () => {
		jest.spyOn(TokenModule, 'addPostMessageListener').mockImplementation(() =>
			Promise.resolve({
				code: 'code',
				state: 'state',
			}),
		);

		jest
			.spyOn(TokenModule, 'loadFrame')
			.mockReturnValue(document.createElement('iframe'));

		const result = await TokenModule.performAuthCodeFlowIframe(
			authorizeParams,
			options,
			oauthUrls,
		);

		expect(result).toEqual({
			code: 'code',
			state: 'state',
		});
	});

	it('should perform auth code flow in iframe and return OAuthAuthorizeResponseError', async () => {
		jest.spyOn(TokenModule, 'addPostMessageListener').mockImplementation(() =>
			Promise.resolve({
				state: 'state',
				error: 'error',
				error_description: 'error_description',
			}),
		);

		jest
			.spyOn(TokenModule, 'loadFrame')
			.mockReturnValue(document.createElement('iframe'));

		const result = await TokenModule.performAuthCodeFlowIframe(
			authorizeParams,
			options,
			oauthUrls,
		);

		expect(result).toEqual({
			state: 'state',
			error: 'error',
			error_description: 'error_description',
		});
	});

	it('should exchange the authorization code for tokens', async () => {
		fetchMock.mockResponseOnce(
			JSON.stringify({
				access_token: 'access_token',
				id_token: 'id_token',
				expires_in: 3600,
				scope: 'test',
				token_type: 'Bearer',
			}),
		);

		const result = await TokenModule.exchangeCodeForTokens(
			'code',
			'code_verifier',
			options,
			oauthUrls,
		);

		expect(result).toEqual({
			access_token: 'access_token',
			id_token: 'id_token',
			expires_in: 3600,
			scope: 'test',
			token_type: 'Bearer',
		});
	});

	it('should exchange the authorization code for tokens and return OAuthTokenResponseError', async () => {
		fetchMock.mockResponseOnce(
			JSON.stringify({
				error: 'error',
				error_description: 'error_description',
			}),
		);

		const result = await TokenModule.exchangeCodeForTokens(
			'code',
			'code_verifier',
			options,
			oauthUrls,
		);

		expect(result).toEqual({
			error: 'error',
			error_description: 'error_description',
		});
	});

	it('should verify the id token claims', () => {
		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: new Date().getTime() / 1000 - 1,
			exp: new Date().getTime() / 1000 + 3600,
			nonce: 'nonce',
		};

		const result = TokenModule.verifyIdTokenClaims(claims, 'nonce', options);

		expect(result).toBeUndefined();
	});

	it('should verify the id token and throw if the nonce is incorrect', () => {
		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/tes',
			aud: 'test',
			iat: new Date().getTime() / 1000 - 1,
			exp: new Date().getTime() / 1000 + 3600,
			nonce: 'nonsense',
		};

		expect(() => {
			TokenModule.verifyIdTokenClaims(claims, 'nonce', options);
		}).toThrowError('Invalid nonce');
	});

	it('should verify the id token and throw if the issuer is incorrect', () => {
		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/tes',
			aud: 'test',
			iat: new Date().getTime() / 1000 - 1,
			exp: new Date().getTime() / 1000 + 3600,
			nonce: 'nonce',
		};

		expect(() => {
			TokenModule.verifyIdTokenClaims(claims, 'nonce', options);
		}).toThrowError('Invalid issuer');
	});

	it('should verify the id token and throw if the client id is incorrect', () => {
		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'tes',
			iat: new Date().getTime() / 1000 - 1,
			exp: new Date().getTime() / 1000 + 3600,
			nonce: 'nonce',
		};

		expect(() => {
			TokenModule.verifyIdTokenClaims(claims, 'nonce', options);
		}).toThrowError('Invalid audience');
	});

	it('should verify the id token and throw if the token iat is after exp', () => {
		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: new Date().getTime() / 1000 + 1,
			exp: new Date().getTime() / 1000 - 3600,
			nonce: 'nonce',
		};

		expect(() => {
			TokenModule.verifyIdTokenClaims(claims, 'nonce', options);
		}).toThrowError('Token has expired before it was issued');
	});

	it('should verify the id token and throw if the token is expired', () => {
		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: new Date().getTime() / 1000 - 10,
			exp: new Date().getTime() / 1000 - 1,
			nonce: 'nonce',
		};

		expect(() => {
			TokenModule.verifyIdTokenClaims(claims, 'nonce', options);
		}).toThrowError('Token has expired');
	});

	it('should verify the id token and throw if the token was issued in the future', () => {
		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: new Date().getTime() / 1000 + 10,
			exp: new Date().getTime() / 1000 + 3600,
			nonce: 'nonce',
		};

		expect(() => {
			TokenModule.verifyIdTokenClaims(claims, 'nonce', options);
		}).toThrowError('Token was issued in the future');
	});

	it('should verify the id token and throw if iat or exp are missing', () => {
		const claims1: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: new Date().getTime() / 1000 - 1,
			nonce: 'nonce',
		};

		const claims2: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			exp: new Date().getTime() / 1000 + 3600,
			nonce: 'nonce',
		};

		expect(() => {
			TokenModule.verifyIdTokenClaims(claims1, 'nonce', options);
		}).toThrowError('Token does not contain required claims');

		expect(() => {
			TokenModule.verifyIdTokenClaims(claims2, 'nonce', options);
		}).toThrowError('Token does not contain required claims');
	});
});
