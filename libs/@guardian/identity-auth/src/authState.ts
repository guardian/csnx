import type { IdentityAuthState } from './@types/OAuth';
import type { CustomClaims } from './@types/Token';
import type { Emitter, EventCallback } from './emitter';
import type { TokenManager } from './tokenManager';

/**
 * @class AuthStateManager
 * @description Manages the authentication state of the user
 */
export class AuthStateManager<
	AC extends CustomClaims = CustomClaims,
	IC extends CustomClaims = CustomClaims,
> {
	#authState: IdentityAuthState<AC, IC>;
	#emitter: Emitter;
	#tokenManager: TokenManager<AC, IC>;

	constructor(emitter: Emitter, tokenManager: TokenManager<AC, IC>) {
		this.#emitter = emitter;
		this.#tokenManager = tokenManager;

		// set default auth state, will be updated if there are existing tokens in storage
		this.#authState = {
			accessToken: undefined,
			idToken: undefined,
			isAuthenticated: false,
		};

		// on init, check if there are existing tokens in storage, and if so, update the auth state
		this.#updateAuthState();

		// subscribe to token manager events on addition
		this.#emitter.on('added', () => {
			this.#updateAuthState();
		});

		// subscribe to token manager events on removal
		this.#emitter.on('removed', () => {
			this.#updateAuthState();
		});

		// subscribe to token manager events on storage
		this.#emitter.on('storage', () => {
			this.#updateAuthState();
		});
	}

	/**
	 * @name updateAuthState
	 * @description Updates the auth state based on the tokens in storage
	 * @returns void
	 */
	#updateAuthState() {
		// check if there are existing tokens in storage
		const tokens = this.#tokenManager.getTokensSync();

		// if there are tokens, set the auth state
		if (tokens) {
			this.#authState = {
				accessToken: tokens.accessToken,
				idToken: tokens.idToken,
				isAuthenticated: true,
			};
		} else {
			// if there are no tokens, set the auth state to false
			this.#authState = {
				accessToken: undefined,
				idToken: undefined,
				isAuthenticated: false,
			};
		}

		// emit the auth state change
		this.#emitter.emit('authStateChange', this.#authState);
	}

	/**
	 * @name getAuthState
	 * @description Returns the current auth state
	 * @returns IdentityAuthState
	 */
	public getAuthState(): IdentityAuthState<AC, IC> {
		return this.#authState;
	}

	/**
	 * @name subscribe
	 * @description Subscribes to auth state changes
	 * @param handler	- The EventCallback to use to subscribe
	 */
	public subscribe(handler: EventCallback): void {
		this.#emitter.on('authStateChange', handler);
	}

	/**
	 * @name unsubscribe
	 * @description Unsubscribes from auth state changes
	 * @param handler	- The EventCallback to used to subscribe
	 */
	public unsubscribe(handler: EventCallback): void {
		this.#emitter.off('authStateChange', handler);
	}
}
