/* eslint-disable react-hooks/rules-of-hooks --
	there's no hooks in here, but there _are_ things called useXXX etc */

import { onConsent } from './onConsent';
import type { ConsentState } from './types';

export type UseCase =
	| 'targeted advertising'
	| 'targeted marketing'
	| 'essential'
	| 'internal'; // for internal tooling etc, i.e. **not** for user-facing features

export const useCaseAllowed = async (useCase: UseCase) => {
	if (useCase === 'essential' || useCase === 'internal') {
		return true;
	}

	return useCaseAllowedSync(useCase, await onConsent());
};

export const useCaseAllowedSync = (
	useCase: UseCase,
	consentState: ConsentState,
) => {
	try {
		if (useCase === 'essential' || useCase === 'internal') {
			return true;
		}

		const { canTarget, tcfv2, ccpa, aus } = consentState;

		switch (useCase) {
			case 'targeted advertising': {
				return canTarget;
			}
			case 'targeted marketing': {
				if (tcfv2) {
					return (
						tcfv2.consents['1'] && tcfv2.consents['3'] && tcfv2.consents['7']
					);
				}

				if (ccpa) {
					return !ccpa.doNotSell;
				}

				if (aus) {
					return aus.personalisedAdvertising;
				}
			}
		}

		throw new Error(`Unknown use case: ${useCase}`);
	} catch (e) {
		console.error(e);

		// if something's gone wrong, deny consent
		return false;
	}
};
