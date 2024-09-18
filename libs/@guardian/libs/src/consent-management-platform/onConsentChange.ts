import { getConsentState as getAUSConsentState } from './aus/getConsentState';
import { getCurrentFramework } from './getCurrentFramework';
import { getGpcSignal } from './lib/signals';
import { getConsentState as getTCFv2ConsentState } from './tcfv2/getConsentState';
import type { CallbackQueueItem, ConsentState, OnConsentChange } from './types';
import type { AUSConsentState } from './types/aus';
import type { TCFv2ConsentState } from './types/tcfv2';
import type { USNATConsentState } from './types/usnat';
import { getConsentState as getUSNATConsentState } from './usnat/getConsentState';

interface ConsentStateBasic {
	tcfv2?: TCFv2ConsentState;
	usnat?: USNATConsentState;
	aus?: AUSConsentState;
}

// callbacks cache
const callBackQueue: CallbackQueueItem[] = [];
const finalCallbackQueue: CallbackQueueItem[] = [];

/**
 * In TCFv2, check whether the event status anything but `cmpuishown`, i.e.:
 * - `useractioncomplete`
 * - `tcloaded`
 */
const awaitingUserInteractionInTCFv2 = (state: ConsentState): boolean =>
	state.tcfv2?.eventStatus === 'cmpuishown';

const awaitingUserInteractionInUSNAT = (state: ConsentState): boolean =>
	state.usnat?.signalStatus === 'not ready';

const invokeCallback = (callback: CallbackQueueItem, state: ConsentState) => {
	if (
		awaitingUserInteractionInTCFv2(state) ||
		awaitingUserInteractionInUSNAT(state)
	) {
		return;
	}

	const stateString = JSON.stringify(state);

	// only invoke callback if the consent state has changed
	if (stateString !== callback.lastState) {
		callback.fn(state);
		callback.lastState = stateString;
	}
};

/**
 * Adds properties for convenience on consent state:
 *
 * - `canTarget`: if the user can be targeted for personalisation according to the active consent framework
 * - `framework`: the active consent framework
 * - `gpcSet`: is the JS indicator of the GPC signal
 *
 * @param consentState
 * @returns Promise<ConsentState>
 */
const enhanceConsentState = (consentState: ConsentStateBasic): ConsentState => {
	const gpcSignal = getGpcSignal();

	if (consentState.tcfv2) {
		const consents = consentState.tcfv2.consents;
		return {
			...consentState,
			canTarget:
				Object.keys(consents).length > 0 &&
				Object.values(consents).every(Boolean),
			framework: 'tcfv2',
			gpcSignal,
		};
	} else if (consentState.usnat) {
		return {
			...consentState,
			canTarget: !consentState.usnat.doNotSell,
			framework: 'usnat',
			gpcSignal,
		};
	} else if (consentState.aus) {
		return {
			...consentState,
			canTarget: consentState.aus.personalisedAdvertising,
			framework: 'aus',
			gpcSignal,
		};
	}
	return {
		...consentState,
		canTarget: false,
		framework: null,
		gpcSignal,
	};
};

const getConsentState: () => Promise<ConsentState> = async () => {
	switch (getCurrentFramework()) {
		case 'aus':
			return enhanceConsentState({ aus: await getAUSConsentState() });
		case 'usnat': {
			return enhanceConsentState({
				usnat: await getUSNATConsentState(),
			});
		}
		case 'tcfv2':
			return enhanceConsentState({ tcfv2: await getTCFv2ConsentState() });
		default:
			throw new Error('no IAB consent framework found on the page');
	}
};

// invokes all stored callbacks with the current consent state
export const invokeCallbacks = (): void => {
	const callbacksToInvoke = callBackQueue.concat(finalCallbackQueue);
	if (callbacksToInvoke.length === 0) {
		return;
	}
	void getConsentState().then((state) => {
		if (
			awaitingUserInteractionInTCFv2(state) ||
			awaitingUserInteractionInUSNAT(state)
		) {
			return;
		}

		callbacksToInvoke.forEach((callback) => invokeCallback(callback, state));
	});
};

export const onConsentChange: OnConsentChange = (callBack, final = false) => {
	const newCallback: CallbackQueueItem = { fn: callBack };

	if (final) {
		finalCallbackQueue.push(newCallback);
	} else {
		callBackQueue.push(newCallback);
	}

	// if consentState is already available, invoke callback immediately
	void getConsentState()
		.then((consentState) => {
			invokeCallback(newCallback, consentState);
		})
		/* istanbul ignore next */
		.catch(() => {
			// do nothing - callback will be added the list anyway and executed when consent changes
		});
};

export const _ = { getConsentState };
