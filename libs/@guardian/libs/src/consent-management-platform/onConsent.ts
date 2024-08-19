import { onConsentChange } from './onConsentChange';
import type { ConsentState } from './types';

/**
 * A promise wrapper around `onConsentChange` that resolves the initial consent state
 *
 * This will only resolve once whereas callbacks passed to `onConsentChange`
 * are executed each time consent state changes. Avoid using this function
 * in contexts where subsequent consent states must be listened for.
 *
 * @returns Promise<ConsentState>
 */
const onConsent = (): Promise<ConsentState> =>
	new Promise<ConsentState>((resolve, reject) => {
		onConsentChange((consentState) => {
			if (consentState.tcfv2 ?? consentState.ccpa ?? consentState.aus) {
				resolve(consentState);
			}
			// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors -- we want to reject with a string
			reject('Unknown framework');
		});
	});

export { onConsent };
