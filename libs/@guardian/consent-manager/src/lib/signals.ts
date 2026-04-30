import { isServerSide } from '../server';

/**
 * Determines whether the JavaScript GPC signal is present
 * https://globalprivacycontrol.github.io/gpc-spec/#javascript-property-to-detect-preference
 *
 * @returns boolean | undefined
 */

export const getGpcSignal = (): boolean | undefined => {
	return isServerSide ? undefined : navigator.globalPrivacyControl;
};
