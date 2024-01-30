import { log } from '@guardian/libs';
import { CMP as UnifiedCMP } from './cmp';
import { disable, enable, isDisabled } from './disable';
import { getConsentFor as clientGetConsentFor } from './getConsentFor';
import { getFramework } from './getFramework';
import { onConsent as clientOnConsent } from './onConsent';
import { onConsentChange as clientOnConsentChange } from './onConsentChange';
import {
	isServerSide,
	cmp as serverCmp,
	getConsentFor as serverGetConsentFor,
	onConsent as serverOnConsent,
	onConsentChange as serverOnConsentChange,
} from './server';
import type { CMP, InitCMP, WillShowPrivacyMessage } from './types';
import { initVendorDataManager } from './vendorDataManager';

export { cmpGetCookie, cmpSetCookie, cmpSetSessionCookie} from './cmpCookies';
export { storage } from './cmpStorage'

// Store some bits in the global scope for reuse, in case there's more
// than one instance of the CMP on the page in different scopes.
if (!isServerSide) {
	window.guCmpHotFix ||= {};
}

let _willShowPrivacyMessage: undefined | boolean;
let initComplete = false;

let resolveInitialised: (value?: unknown) => void;

const initialised = new Promise((resolve) => {
	resolveInitialised = resolve;
});

const init: InitCMP = ({ pubData, country }) => {
	if (isDisabled() || isServerSide) return;

	if (window.guCmpHotFix.initialised) {
		if (window.guCmpHotFix.cmp?.version !== __PACKAGE_VERSION__)
			console.warn('Two different versions of the CMP are running:', [
				__PACKAGE_VERSION__,
				window.guCmpHotFix.cmp?.version,
			]);
		return;
	}

	// this is slightly different to initComplete - it's there to
	// prevent another instance of CMP initialising, so we set this true asap.
	// initComplete is set true once we have _finished_ initialising
	window.guCmpHotFix.initialised = true;

	if (typeof country === 'undefined') {
		throw new Error(
			'CMP initialised without `country` property. A 2-letter, ISO ISO_3166-1 country code is required.',
		);
	}

	const framework = getFramework(country);

	UnifiedCMP.init(framework, pubData ?? {});

	void UnifiedCMP.willShowPrivacyMessage().then((willShowValue) => {
		_willShowPrivacyMessage = willShowValue;
		initComplete = true;
		log('cmp', 'initComplete');
	});

	resolveInitialised();

	initVendorDataManager();
};

const willShowPrivacyMessage: WillShowPrivacyMessage = () =>
	initialised.then(() => UnifiedCMP.willShowPrivacyMessage());

const willShowPrivacyMessageSync = () => {
	if (_willShowPrivacyMessage !== undefined) {
		return _willShowPrivacyMessage;
	}
	throw new Error(
		'CMP has not been initialised. Use the async willShowPrivacyMessage() instead.',
	);
};

const hasInitialised = () => initComplete;

const showPrivacyManager = () => {
	void initialised.then(UnifiedCMP.showPrivacyManager);
};

export const cmp: CMP = isServerSide
	? serverCmp
	: (window.guCmpHotFix.cmp ||= {
			init,
			willShowPrivacyMessage,
			willShowPrivacyMessageSync,
			hasInitialised,
			showPrivacyManager,
			version: __PACKAGE_VERSION__,

			// special helper methods for disabling CMP
			__isDisabled: isDisabled,
			__enable: enable,
			__disable: disable,
	  });

export const onConsent = isServerSide
	? serverOnConsent
	: (window.guCmpHotFix.onConsent ||= clientOnConsent);
export const onConsentChange = isServerSide
	? serverOnConsentChange
	: (window.guCmpHotFix.onConsentChange ||= clientOnConsentChange);
export const getConsentFor = isServerSide
	? serverGetConsentFor
	: (window.guCmpHotFix.getConsentFor ||= clientGetConsentFor);
