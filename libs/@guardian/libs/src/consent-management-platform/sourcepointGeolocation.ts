import { log } from '../logger/logger';
import type { SourcepointConsentFramework } from './types';

interface GeolocationCheckStatusApplies {
	gdpr: {
		applies: boolean;
	};
	usnat: {
		applies: boolean;
	};
	ccpa: {
		applies: boolean;
	};
}

/**
 * Gets the Sourcepoint applied consent framework based on their geolocation.
 * This is pointing to the test SP environment which is set up using SP's geolocation
 * @return {*}  {(Promise<{
 * 	frameworkAppliedBySP: SourcepointConsentFramework | undefined;
 * }>)}
 */
export const getSourcepointAppliedConsentFramework = async (): Promise<{
	frameworkAppliedByCDNSPUrl: SourcepointConsentFramework | undefined;
	frameworkAppliedByOriginUrl: SourcepointConsentFramework | undefined;
}> => {
	const cdnUrlResponse = await fetch(
		`https://sourcepoint.theguardian.com/wrapper/v2/meta-data?accountId=1257&env=prod&metadata={"gdpr":{},"usnat":{},"ccpa":{}}&propertyId=9398`,
	);

	const originUrlResponse = await fetch(
		`https://cdn.privacy-mgmt.com/wrapper/v2/meta-data?accountId=1257&env=prod&metadata={"gdpr":{},"usnat":{},"ccpa":{}}&propertyId=9398`,
	);

	const originUrlGeolocationCheckObject =
		(await originUrlResponse.json()) as GeolocationCheckStatusApplies;

	const cdnUrlGeolocationCheckObject =
		(await cdnUrlResponse.json()) as GeolocationCheckStatusApplies;

	if (
		!isEqualGeoStatus(
			cdnUrlGeolocationCheckObject,
			originUrlGeolocationCheckObject,
		)
	) {
		log('cmp', 'Geolocation check objects are not equal');
	}

	const consentFrameworks: SourcepointConsentFramework[] = [
		'gdpr',
		'usnat',
		'ccpa',
	];
	const frameworkAppliedByCDNSPUrl = consentFrameworks.find(
		(framework) => cdnUrlGeolocationCheckObject[framework].applies,
	);

	const frameworkAppliedByOriginUrl = consentFrameworks.find(
		(framework) => originUrlGeolocationCheckObject[framework].applies,
	);

	return {
		frameworkAppliedByCDNSPUrl,
		frameworkAppliedByOriginUrl,
	};
};
const isEqualGeoStatus = (
	a: GeolocationCheckStatusApplies,
	b: GeolocationCheckStatusApplies,
): boolean => {
	return (
		a.gdpr.applies === b.gdpr.applies &&
		a.usnat.applies === b.usnat.applies &&
		a.ccpa.applies === b.ccpa.applies
	);
};
