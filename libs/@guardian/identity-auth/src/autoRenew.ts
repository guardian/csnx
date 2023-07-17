import { getCookie } from '@guardian/libs';
import type {
	IdentityAuthState,
	RequiredIdentityAuthOptions,
} from './@types/OAuth';
import type { AuthStateManager } from './authState';
import type { Emitter } from './emitter';

/**
 * @class AutoRenewService
 * @description Managing the auto renewal of tokens, if enabled
 */
export class AutoRenewService {
	#options: RequiredIdentityAuthOptions;
	#emitter: Emitter;
	#authStateManager: AuthStateManager;
	started = false;

	#renewAtTimeoutId: number | undefined;

	constructor(
		options: RequiredIdentityAuthOptions,
		emitter: Emitter,
		authStateManager: AuthStateManager,
	) {
		this.#options = options;
		this.#emitter = emitter;
		this.#authStateManager = authStateManager;

		// if there is a storage event, clear the timeout, and start a new one
		this.#emitter.on('storage', () => {
			this.#clearRenewAtTimeout();
			this.#handleAuthStateChange();
		});
	}

	/**
	 * @name clearRenewAtTimeout
	 * @description Clears the timeout for renewing the access token, if it exists
	 */
	#clearRenewAtTimeout() {
		if (this.#renewAtTimeoutId !== undefined) {
			window.clearTimeout(this.#renewAtTimeoutId);
			this.#renewAtTimeoutId = undefined;
		}
	}

	/**
	 * @name setRenewAtTimeout
	 * @description Sets the timeout for renewing the access token based on the expiry time and the grace period
	 * @param expiresAt The time at which the access token expires
	 * @returns The timeout id
	 */
	#setRenewAtTimeout(expiresAt: number) {
		// get the time now
		const now = Date.now();

		// calculate the time at which the access token should be renewed
		const renewAt = (expiresAt - this.#options.renewGracePeriod) * 1000;

		// calculate the timeout duration
		const timeout = renewAt - now;

		// set the timeout
		this.#renewAtTimeoutId = window.setTimeout(() => {
			// if the document is hidden, then we need to wait for the visibility change event before renewing the token
			if (window.document.visibilityState === 'hidden') {
				// if the document is hidden, then wait for the visibility change event
				window.document.addEventListener(
					'visibilitychange',
					() => {
						if (window.document.visibilityState === 'visible') {
							// now that the document is visible, we first check if any other tabs have renewed the token already
							const authState = this.#authStateManager.getAuthState();

							// if the user is authenticated, but there is less than the grace period left on the token, then we should renew it
							if (
								authState.isAuthenticated &&
								authState.accessToken.expiresAt -
									this.#options.renewGracePeriod <
									Math.floor(Date.now() / 1000)
							) {
								// if the token has not been renewed, emit the renew event
								this.#emitter.emit('renew');
							}

							// if the authState is not authenticated, and there is a GU_U cookie, then the token has not been renewed and we can renew it
							if (
								!authState.isAuthenticated &&
								!!getCookie({ name: 'GU_U', shouldMemoize: true })
							) {
								// if the token has not been renewed, emit the renew event
								this.#emitter.emit('renew');
							}
						}
					},
					{
						once: true, // only listen for the event once
					},
				);
			} else {
				// if the document is not hidden, then we can renew the token
				// emit the renew event, which will trigger the renew method in the token manager
				this.#emitter.emit('renew');
			}

			// clear the timeout id once the timeout has been triggered
			this.#renewAtTimeoutId = undefined;
		}, timeout);
	}

	/**
	 * @name handleAuthStateChange
	 * @description Listens for changes to the auth state and sets the timeout for renewing the access token if required
	 * @param state - The IdentityAuthState
	 */
	#handleAuthStateChange(state?: IdentityAuthState) {
		// clear the timeout if it exists
		this.#clearRenewAtTimeout();

		// if the state was not passed in, get the state from the auth state manager
		const authState: IdentityAuthState =
			state ?? this.#authStateManager.getAuthState();

		// if the user is authenticated, set the timeout for renewing the access token
		if (authState.isAuthenticated) {
			this.#setRenewAtTimeout(authState.accessToken.expiresAt);
		}
	}

	/**
	 * @name start
	 * @description Starts the auto renewal service if autoRenew is enabled
	 */
	start() {
		if (this.#options.autoRenew && !this.started) {
			// set the started flag to true
			this.started = true;

			// listen for auth state changes
			this.#emitter.on('authStateChange', (state: IdentityAuthState) =>
				this.#handleAuthStateChange(state),
			);

			// handle the auth state change on start
			this.#handleAuthStateChange();
		}
	}
}
