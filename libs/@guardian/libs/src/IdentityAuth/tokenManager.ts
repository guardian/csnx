import { storage } from '../storage/storage';
import type {
	AccessToken,
	CustomClaims,
	IDToken,
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

		// set the new tokens in storage
		this.#storage.set(
			this.#accessTokenKey,
			tokens.accessToken,
			new Date(tokens.accessToken.expiresAt * 1000),
		);
		this.#storage.set(
			this.#idTokenKey,
			tokens.idToken,
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
		const accessToken = this.#storage.get(
			this.#accessTokenKey,
		) as AccessToken<AC> | null;

		const idToken = this.#storage.get(this.#idTokenKey) as IDToken<IC> | null;

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
	 * @param verifyToken - If true, will verify the token before returning (default: true)
	 * @param refreshIfRequired - If true, will refresh the tokens if they are expired (default: false)
	 * @returns Promise<Tokens | undefined> - The tokens if they exist
	 */
	public async getTokens({
		refreshIfRequired = false,
		verifyToken = true,
	} = {}): Promise<Tokens<AC, IC> | undefined> {
		try {
			const tokens = this.getTokensSync();

			if (tokens) {
				if (verifyToken) {
					await this.#token.verifyToken(tokens.idToken, tokens.accessToken);
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
}
