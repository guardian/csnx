import { storage } from '@guardian/libs';
import type {
	AccessToken,
	AccessTokenStorage,
	CustomClaims,
	IDToken,
	IDTokenStorage,
	Tokens,
	TokenType,
} from './@types/Token';
import type { Emitter } from './emitter';
import type { Token } from './token';
import { isAccessToken, isIDToken } from './token';

/**
 * @class TokenManager
 * @description Manages the storage and retrieval of tokens
 */
export class TokenManager<
	AC extends CustomClaims = CustomClaims,
	IC extends CustomClaims = CustomClaims,
> {
	#token: Token<AC, IC>;
	#emitter: Emitter;
	#storage = storage.local;
	#accessTokenKey = 'gu.access_token';
	#idTokenKey = 'gu.id_token';

	constructor(emitter: Emitter, tokenClass: Token<AC, IC>) {
		this.#emitter = emitter;
		this.#token = tokenClass;

		// subscribe to storage events, and emit an event when the storage is updated
		window.addEventListener('storage', (event) => {
			if (
				event.key === this.#accessTokenKey ||
				event.key === this.#idTokenKey
			) {
				this.#emitStorage();
			}
		});

		this.#emitter.on('renew', async () => {
			await this.renew();
		});
	}

	/**
	 * @name emitAdded
	 * @description Emits an event when a token is added
	 */
	#emitAdded(key: TokenType, token?: AccessToken | IDToken) {
		this.#emitter.emit('added', key, token);
	}

	/**
	 * @name emitRemoved
	 * @description Emits an event when a token is removed
	 */
	#emitRemoved(key: TokenType, token?: AccessToken | IDToken) {
		this.#emitter.emit('removed', key, token);
	}

	/**
	 * @name emitStorage
	 * @description Emits an event when the local storage is updated
	 */
	#emitStorage() {
		this.#emitter.emit('storage');
	}

	/**
	 * @name setTokens
	 * @description Sets the tokens in storage and emits an event
	 * @param tokens - The tokens to set
	 * @returns void
	 */
	public setTokens(tokens: Tokens<AC, IC>): void {
		// setup the valid token types
		const tokenTypes: TokenType[] = ['accessToken', 'idToken'];

		// check if there are existing tokens in storage
		const existingTokens = this.getTokensSync();

		// setup the storage objects
		const accessTokenStorage: AccessTokenStorage = {
			accessToken: tokens.accessToken.accessToken,
		};

		const idTokenStorage: IDTokenStorage = {
			idToken: tokens.idToken.idToken,
			nonce: tokens.idToken.nonce,
		};

		// set the new tokens in storage
		this.#storage.set(
			this.#accessTokenKey,
			accessTokenStorage,
			new Date(tokens.accessToken.expiresAt * 1000),
		);
		this.#storage.set(
			this.#idTokenKey,
			idTokenStorage,
			new Date(tokens.idToken.expiresAt * 1000),
		);

		// emit events for each token type
		tokenTypes.forEach((tokenType) => {
			const newToken = tokens[tokenType];
			const existingToken = existingTokens?.[tokenType];

			if (existingToken) {
				this.#emitRemoved(tokenType, existingToken);
				this.#emitAdded(tokenType, newToken);
			} else {
				this.#emitAdded(tokenType, newToken);
			}
		});
	}

	/**
	 * @name getTokensSync
	 * @description Gets the tokens from storage synchronously, does not refresh tokens or verify them
	 *
	 * @returns Tokens | undefined - The tokens if they exist
	 */
	public getTokensSync(): Tokens<AC, IC> | undefined {
		const accessTokenFromStorage = this.#storage.get(
			this.#accessTokenKey,
		) as AccessTokenStorage | null;

		const idTokenFromStorage = this.#storage.get(
			this.#idTokenKey,
		) as IDTokenStorage | null;

		if (
			!accessTokenFromStorage?.accessToken ||
			!idTokenFromStorage?.idToken ||
			!idTokenFromStorage.nonce
		) {
			return undefined;
		}

		const { accessToken, idToken } = this.#token.decodeTokens(
			accessTokenFromStorage.accessToken,
			idTokenFromStorage.idToken,
			idTokenFromStorage.nonce,
		);

		if (!isAccessToken(accessToken) || !isIDToken(idToken)) {
			return undefined;
		}

		return {
			accessToken,
			idToken,
		};
	}

	/**
	 * @name getTokens
	 * @description Gets the tokens from storage asynchronously, can refresh tokens if required and verify them
	 *
	 * @param verifyTokens - If true, will verify the token before returning (default: true)
	 * @param refreshIfRequired - If true, will refresh the tokens if they are expired (default: false)
	 * @returns Promise<Tokens | undefined> - The tokens if they exist
	 */
	public async getTokens({
		refreshIfRequired = false,
		verifyTokens = true,
	} = {}): Promise<Tokens<AC, IC> | undefined> {
		try {
			const tokens = this.getTokensSync();

			if (tokens) {
				if (verifyTokens) {
					await this.#token.verifyTokens(tokens.idToken, tokens.accessToken);
					return tokens;
				}
				return tokens;
			}

			if (refreshIfRequired) {
				const tokenResponse = await this.#token.getWithoutPrompt();
				this.setTokens(tokenResponse.tokens);
				return tokenResponse.tokens;
			}

			return undefined;
		} catch (error) {
			this.clear();
			throw error;
		}
	}

	/**
	 * @name clear
	 * @description Clears the tokens from storage and emits an event
	 * @returns void
	 */
	public clear(): void {
		this.#storage.remove(this.#accessTokenKey);
		this.#storage.remove(this.#idTokenKey);
		this.#emitRemoved('accessToken');
		this.#emitRemoved('idToken');
	}

	/**
	 * @name renew
	 * @description Attempts to renew the tokens, regardless of whether they are expired or not
	 * @returns Promise<Tokens | undefined> - The tokens if they exist
	 */
	public async renew(): Promise<Tokens<AC, IC> | undefined> {
		const tokenResponse = await this.#token.getWithoutPrompt();
		this.setTokens(tokenResponse.tokens);
		return tokenResponse.tokens;
	}
}
