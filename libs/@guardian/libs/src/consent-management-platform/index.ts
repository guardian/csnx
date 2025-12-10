import { version } from '../../package.json';
import type { CountryCode } from '../countries/@types/CountryCode';
import { countries } from '../countries/countries';
import { log } from '../logger/logger';
import { CMP as UnifiedCMP } from './cmp';
import { disable, enable, isDisabled } from './disable';
import { getConsentFor as clientGetConsentFor } from './getConsentFor';
import { getConsentOptOutStatus as clientGetConsentOptOutStatus } from './getConsentOptOutStatus';
import { getFramework } from './getFramework';
import { onConsent as clientOnConsent } from './onConsent';
import { onConsentChange as clientOnConsentChange } from './onConsentChange';
import {
	isServerSide,
	cmp as serverCmp,
	getConsentFor as serverGetConsentFor,
	getConsentOptOutStatus as serverGetConsentOptOutStatus,
	onConsent as serverOnConsent,
	onConsentChange as serverOnConsentChange,
} from './server';
import type { CMP, InitCMP, WillShowPrivacyMessage } from './types';
import { initVendorDataManager } from './vendorDataManager';

// Store some bits in the global scope for reuse, in case there's more
// than one instance of the CMP on the page in different scopes.
if (!isServerSide) {
	if (typeof window.guCmpHotFix === 'undefined') {
		window.guCmpHotFix = {};
	}
}

let _willShowPrivacyMessage: undefined | boolean;
let initComplete = false;

let resolveInitialised: (value?: unknown) => void;

const initialised = new Promise((resolve) => {
	resolveInitialised = resolve;
});

const init: InitCMP = ({
	pubData,
	country,
	isUserSignedIn = false,
	useNonAdvertisedList = false,
}) => {
	if (isDisabled() || isServerSide) {
		return;
	}

	if (window.guCmpHotFix.initialised) {
		if (window.guCmpHotFix.cmp?.version !== version) {
			console.warn('Two different versions of the CMP are running:', [
				version,
				window.guCmpHotFix.cmp?.version,
			]);
		}
		return;
	}

	// this is slightly different to initComplete - it's there to
	// prevent another instance of CMP initialising, so we set this true asap.
	// initComplete is set true once we have _finished_ initialising
	window.guCmpHotFix.initialised = true;

	// Check for URL parameter country override (only in non-production)
	const urlParams = new URLSearchParams(window.location.search);
	const geoOverride = urlParams.get('_sp_geo_override');
	const isProduction = window.location.origin === 'https://www.theguardian.com';

	let finalCountry: CountryCode | undefined;
	if (geoOverride && !isProduction) {
		// Parse the geo override format: CC-RR (e.g., US-CA, CA-QC, DE-XX)
		const countryOverride = geoOverride.split('-')[0];

		const isValidCountry = Object.values(countries).some(
			(country) => country.countryCode === countryOverride,
		);

		if (isValidCountry) {
			console.log(
				'Using geolocation override:',
				geoOverride,
				'(country:',
				countryOverride + ')',
			);
			if (country) {
				console.log('Original country would have been:', country);
			}
			finalCountry = countryOverride as CountryCode;
		} else {
			console.warn(
				'Invalid geolocation override "' +
					geoOverride +
					'" - invalid country code "' +
					countryOverride +
					'" - falling back to detected country',
			);
			finalCountry = country;
		}
	} else {
		if (geoOverride && isProduction) {
			console.warn('Geolocation override ignored in production environment');
		}
		finalCountry = country;
	}

	if (typeof finalCountry === 'undefined') {
		throw new Error(
			'CMP initialised without `country` property. A 2-letter, ISO ISO_3166-1 country code is required.',
		);
	}

	const framework = getFramework(finalCountry);

	UnifiedCMP.init(
		framework,
		finalCountry,
		isUserSignedIn,
		useNonAdvertisedList,
		pubData ?? {},
	);

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
	: (window.guCmpHotFix.cmp ??= {
			init,
			willShowPrivacyMessage,
			willShowPrivacyMessageSync,
			hasInitialised,
			showPrivacyManager,
			version: version,

			// special helper methods for disabling CMP
			__isDisabled: isDisabled,
			__enable: enable,
			__disable: disable,
		});

export const onConsent = isServerSide
	? serverOnConsent
	: (window.guCmpHotFix.onConsent ??= clientOnConsent);
export const onConsentChange = isServerSide
	? serverOnConsentChange
	: (window.guCmpHotFix.onConsentChange ??= clientOnConsentChange);
export const getConsentFor = isServerSide
	? serverGetConsentFor
	: (window.guCmpHotFix.getConsentFor ??= clientGetConsentFor);
export const getConsentOptOutStatus = isServerSide
	? serverGetConsentOptOutStatus
	: (window.guCmpHotFix.getConsentOptOutStatus ??=
			clientGetConsentOptOutStatus);
