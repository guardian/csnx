import fetchMock from 'jest-fetch-mock';
import type {
	AuthorizeParams,
	OAuthUrls,
	RequiredIdentityAuthOptions,
} from '../@types/OAuth';
import type { AccessToken, IDToken, JWTPayload } from '../@types/Token';
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
	const options: RequiredIdentityAuthOptions = {
		clientId: 'test',
		issuer: 'https://profile.theguardian.com/oauth2/test',
		redirectUri: 'test',
		scopes: ['openid', 'profile', 'test'],
		maxClockSkew: 300,
		autoRenew: false,
		renewGracePeriod: 0,
		idCookieSessionRefresh: false,
	};
	const oauthUrls: OAuthUrls = {
		authorizeUrl: 'https://profile.theguardian.com/oauth2/test/v1/authorize',
		tokenUrl: 'https://profile.theguardian.com/oauth2/test/v1/token',
		keysUrl: 'https://profile.theguardian.com/oauth2/test/v1/keys',
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
		const now = Math.floor(Date.now() / 1000);

		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: now - 1,
			exp: now + 3600,
			nonce: 'nonce',
		};

		const idToken = {
			claims,
			clientId: 'test',
			issuer: 'https://profile.theguardian.com/oauth2/test',
			nonce: 'nonce',
			clockSkew: 0,
		} as IDToken;

		const result = TokenModule.verifyIdTokenClaims(idToken, claims, options);

		expect(result).toBeUndefined();
	});

	it('should verify the id token and throw if the nonce is incorrect', () => {
		const now = Math.floor(Date.now() / 1000);

		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/tes',
			aud: 'test',
			iat: now - 1,
			exp: now + 3600,
			nonce: 'nonsense',
		};

		const idToken = {
			claims,
			clientId: 'test',
			issuer: 'https://profile.theguardian.com/oauth2/test',
			nonce: 'nonce',
			clockSkew: 0,
		} as IDToken;

		expect(() => {
			TokenModule.verifyIdTokenClaims(idToken, claims, options);
		}).toThrowError('Invalid nonce');
	});

	it('should verify the id token and throw if the issuer is incorrect', () => {
		const now = Math.floor(Date.now() / 1000);

		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/tes',
			aud: 'test',
			iat: now - 1,
			exp: now + 3600,
			nonce: 'nonce',
		};

		const idToken = {
			claims,
			clientId: 'test',
			issuer: 'https://profile.theguardian.com/oauth2/test',
			nonce: 'nonce',
			clockSkew: 0,
		} as IDToken;

		expect(() => {
			TokenModule.verifyIdTokenClaims(idToken, claims, options);
		}).toThrowError('Invalid issuer');
	});

	it('should verify the id token and throw if the client id is incorrect', () => {
		const now = Math.floor(Date.now() / 1000);

		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'tes',
			iat: now - 1,
			exp: now + 3600,
			nonce: 'nonce',
		};

		const idToken = {
			claims,
			clientId: 'test',
			issuer: 'https://profile.theguardian.com/oauth2/test',
			nonce: 'nonce',
			clockSkew: 0,
		} as IDToken;

		expect(() => {
			TokenModule.verifyIdTokenClaims(idToken, claims, options);
		}).toThrowError('Invalid audience');
	});

	it('should verify the id token and throw if the token was issued in the future', () => {
		const now = Math.floor(Date.now() / 1000);

		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: now + 10,
			exp: now + 3600,
			nonce: 'nonce',
		};

		const idToken = {
			claims,
			clientId: 'test',
			issuer: 'https://profile.theguardian.com/oauth2/test',
			nonce: 'nonce',
			clockSkew: 0,
		} as IDToken;

		expect(() => {
			TokenModule.verifyIdTokenClaims(idToken, claims, options);
		}).toThrowError('Token was issued in the future');
	});

	it('should verify the id token and throw if iat is missing', () => {
		const now = Math.floor(Date.now() / 1000);

		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			exp: now + 3600,
			nonce: 'nonce',
		};

		const idToken = {
			claims,
			clientId: 'test',
			issuer: 'https://profile.theguardian.com/oauth2/test',
			nonce: 'nonce',
			clockSkew: 0,
		} as IDToken;

		expect(() => {
			TokenModule.verifyIdTokenClaims(idToken, claims, options);
		}).toThrowError('Token does not contain required claims');
	});

	it('id token: positive clock skew checking iat: normalised local time > iat is valid (token not issued in future)', () => {
		const localTime = Math.floor(Date.now() / 1000);
		const clockSkew = 1; // mock local clock skew of 1 second ahead of server time
		const serverTime = localTime - clockSkew; // mocking server time

		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: serverTime, // mocking token issued at server time
			exp: serverTime + 3600,
			nonce: 'nonce',
		};

		const idToken = {
			claims,
			clientId: 'test',
			issuer: 'https://profile.theguardian.com/oauth2/test',
			nonce: 'nonce',
			clockSkew,
		} as IDToken;

		expect(() => {
			TokenModule.verifyIdTokenClaims(idToken, claims, options);
		}).not.toThrowError();
	});

	it('id token: positive clock skew checking iat: normalised local time < iat is invalid (token issued in future)', () => {
		const localTime = Math.floor(Date.now() / 1000);
		const clockSkew = 1; // mock local clock skew of 1 second ahead of server time
		const serverTime = localTime - clockSkew; // mocking server time

		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: serverTime + 1, // mocking token issued 1 second in the future
			exp: serverTime + 3600,
			nonce: 'nonce',
		};

		const idToken = {
			claims,
			clientId: 'test',
			issuer: 'https://profile.theguardian.com/oauth2/test',
			nonce: 'nonce',
			clockSkew,
		} as IDToken;

		// should fail because local time is 1 second behind server time
		expect(() => {
			TokenModule.verifyIdTokenClaims(idToken, claims, options);
		}).toThrowError('Token was issued in the future');
	});

	it('id token: negative clock skew checking iat: normalised local time < iat is valid (token not in future)', () => {
		const localTime = Math.floor(Date.now() / 1000);
		const clockSkew = -1; // mock local clock skew of 1 second behind server time
		const serverTime = localTime - clockSkew; // mocking server time

		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: serverTime, // mocking token issued at server time
			exp: serverTime + 3600,
			nonce: 'nonce',
		};

		const idToken = {
			claims,
			clientId: 'test',
			issuer: 'https://profile.theguardian.com/oauth2/test',
			nonce: 'nonce',
			clockSkew,
		} as IDToken;

		expect(() => {
			TokenModule.verifyIdTokenClaims(idToken, claims, options);
		}).not.toThrowError();
	});

	it('id token: negative clock skew checking iat: normalised local time > iat is invalid (token issued in future)', () => {
		const localTime = Math.floor(Date.now() / 1000);
		const clockSkew = -1; // mock local clock skew of 1 second behind server time
		const serverTime = localTime - clockSkew; // mocking server time

		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: serverTime + 1, // mocking token issued 1 second in the future
			exp: serverTime + 3600,
			nonce: 'nonce',
		};

		const idToken = {
			claims,
			clientId: 'test',
			issuer: 'https://profile.theguardian.com/oauth2/test',
			nonce: 'nonce',
			clockSkew,
		} as IDToken;

		expect(() => {
			TokenModule.verifyIdTokenClaims(idToken, claims, options);
		}).toThrowError('Token was issued in the future');
	});

	it('should verify the access token timestamps and throw if the token iat is after exp', () => {
		const now = Math.floor(Date.now() / 1000);

		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: now + 1,
			exp: now - 3600,
		};

		const accessToken = {
			claims,
			clockSkew: 0,
		} as AccessToken;

		expect(() => {
			TokenModule.verifyAccessTokenTimestamps(accessToken, claims);
		}).toThrowError('Token has expired before it was issued');
	});

	it('should verify the access token timestamps and throw if the token is expired', () => {
		const now = Math.floor(Date.now() / 1000);

		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: now - 10,
			exp: now - 1,
		};

		const accessToken = {
			claims,
			clockSkew: 0,
		} as AccessToken;

		expect(() => {
			TokenModule.verifyAccessTokenTimestamps(accessToken, claims);
		}).toThrowError('Token has expired');
	});

	it('should verify the access token timestamps and throw if the token was issued in the future', () => {
		const now = Math.floor(Date.now() / 1000);

		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: now + 10,
			exp: now + 3600,
		};

		const accessToken = {
			claims,
			clockSkew: 0,
		} as AccessToken;

		expect(() => {
			TokenModule.verifyAccessTokenTimestamps(accessToken, claims);
		}).toThrowError('Token was issued in the future');
	});

	it('should verify the access token timestamps and throw if iat or exp are missing', () => {
		const now = Math.floor(Date.now() / 1000);

		const claims1: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: now - 1,
		};

		const claims2: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			exp: now + 3600,
		};

		const accessToken1 = {
			claims: claims1,
			clockSkew: 0,
		} as AccessToken;

		const accessToken2 = {
			claims: claims2,
			clockSkew: 0,
		} as AccessToken;

		expect(() => {
			TokenModule.verifyAccessTokenTimestamps(accessToken1, claims1);
		}).toThrowError('Token does not contain required claims');

		expect(() => {
			TokenModule.verifyAccessTokenTimestamps(accessToken2, claims2);
		}).toThrowError('Token does not contain required claims');
	});

	it('access token timestamps: positive clock skew checking exp: exp > normalised local time is valid (token not expired)', () => {
		const localTime = Math.floor(Date.now() / 1000);
		const clockSkew = 1; // mock local clock skew of 1 second ahead of server time
		const serverTime = localTime - clockSkew; // mocking server time

		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: 1,
			exp: serverTime, // mocking token expiry at server time
		};

		const accessToken = {
			claims,
			clockSkew,
		} as AccessToken;

		expect(() => {
			TokenModule.verifyAccessTokenTimestamps(accessToken, claims);
		}).not.toThrowError();
	});

	it('access token timestamps: positive clock skew checking exp: exp < normalised local time is invalid (token expired)', () => {
		const localTime = Math.floor(Date.now() / 1000);
		const clockSkew = 1; // mock local clock skew of 1 second ahead of server time
		const serverTime = localTime - clockSkew; // mocking server time expiry

		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: 1,
			exp: serverTime - 1, // mocking token expiry 1 second in the past
		};

		const accessToken = {
			claims,
			clockSkew,
		} as AccessToken;

		expect(() => {
			TokenModule.verifyAccessTokenTimestamps(accessToken, claims);
		}).toThrowError('Token has expired');
	});

	it('access token timestamps: negative clock skew checking exp: exp > normalised local time is valid (token not expired)', () => {
		const localTime = Math.floor(Date.now() / 1000);
		const clockSkew = -1; // mock local clock skew of 1 second behind server time
		const serverTime = localTime - clockSkew; // mocking server time

		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: 1,
			exp: serverTime, // mocking token expiry at server time
		};

		const accessToken = {
			claims,
			clockSkew,
		} as AccessToken;

		expect(() => {
			TokenModule.verifyAccessTokenTimestamps(accessToken, claims);
		}).not.toThrowError();
	});

	it('access token timestamps: negative clock skew checking exp: exp < normalised local time is invalid (token has expired)', () => {
		const localTime = Math.floor(Date.now() / 1000);
		const clockSkew = -1; // mock local clock skew of 1 second behind server time
		const serverTime = localTime - clockSkew; // mocking server time expiry

		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: 1,
			exp: serverTime - 1, // mocking token expiry 1 second in the past
		};

		const accessToken = {
			claims,
			clockSkew,
		} as AccessToken;

		expect(() => {
			TokenModule.verifyAccessTokenTimestamps(accessToken, claims);
		}).toThrowError('Token has expired');
	});

	it('access token timestamps: positive clock skew checking iat: normalised local time > iat is valid (token not issued in future)', () => {
		const localTime = Math.floor(Date.now() / 1000);
		const clockSkew = 1; // mock local clock skew of 1 second ahead of server time
		const serverTime = localTime - clockSkew; // mocking server time

		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: serverTime, // mocking token issued at server time
			exp: serverTime + 3600,
		};

		const accessToken = {
			claims,
			clockSkew,
		} as AccessToken;

		expect(() => {
			TokenModule.verifyAccessTokenTimestamps(accessToken, claims);
		}).not.toThrowError();
	});

	it('access token timestamps: positive clock skew checking iat: normalised local time < iat is invalid (token issued in future)', () => {
		const localTime = Math.floor(Date.now() / 1000);
		const clockSkew = 1; // mock local clock skew of 1 second ahead of server time
		const serverTime = localTime - clockSkew; // mocking server time

		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: serverTime + 1, // mocking token issued 1 second in the future
			exp: serverTime + 3600,
		};

		const accessToken = {
			claims,
			clockSkew,
		} as AccessToken;

		// should fail because local time is 1 second behind server time
		expect(() => {
			TokenModule.verifyAccessTokenTimestamps(accessToken, claims);
		}).toThrowError('Token was issued in the future');
	});

	it('access token timestamps: negative clock skew checking iat: normalised local time < iat is valid (token not in future)', () => {
		const localTime = Math.floor(Date.now() / 1000);
		const clockSkew = -1; // mock local clock skew of 1 second behind server time
		const serverTime = localTime - clockSkew; // mocking server time

		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: serverTime, // mocking token issued at server time
			exp: serverTime + 3600,
		};

		const accessToken = {
			claims,
			clockSkew,
		} as AccessToken;

		expect(() => {
			TokenModule.verifyAccessTokenTimestamps(accessToken, claims);
		}).not.toThrowError();
	});

	it('access token timestamps: negative clock skew checking iat: normalised local time > iat is invalid (token issued in future)', () => {
		const localTime = Math.floor(Date.now() / 1000);
		const clockSkew = -1; // mock local clock skew of 1 second behind server time
		const serverTime = localTime - clockSkew; // mocking server time

		const claims: JWTPayload = {
			iss: 'https://profile.theguardian.com/oauth2/test',
			aud: 'test',
			iat: serverTime + 1, // mocking token issued 1 second in the future
			exp: serverTime + 3600,
		};

		const accessToken = {
			claims,
			clockSkew,
		} as AccessToken;

		expect(() => {
			TokenModule.verifyAccessTokenTimestamps(accessToken, claims);
		}).toThrowError('Token was issued in the future');
	});
});
