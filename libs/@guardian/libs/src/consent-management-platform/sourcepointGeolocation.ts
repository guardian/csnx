import { ENDPOINT } from './lib/sourcepointConfig';
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

export /**
 * Gets the Sourcepoint applied consent framework based on their geolocation.
 * This is pointing to the test SP environment which is set up using SP's geolocation
 * @return {*}  {(Promise<{
 * 	frameworkAppliedBySP: SourcepointConsentFramework | undefined;
 * }>)}
 */
const getSourcepointAppliedConsentFramework = async (): Promise<{
	frameworkAppliedBySP: SourcepointConsentFramework | undefined;
}> => {
	const response = await fetch(
		`${ENDPOINT}/wrapper/v2/meta-data?accountId=1257&env=prod&metadata={"gdpr":{},"usnat":{},"ccpa":{}}&propertyId=9398`,
	);

	const geolocationCheckObject =
		(await response.json()) as GeolocationCheckStatusApplies;

	const consentFrameworks: SourcepointConsentFramework[] = [
		'gdpr',
		'usnat',
		'ccpa',
	];
	const frameworkAppliedBySP = consentFrameworks.find(
		(framework) => geolocationCheckObject[framework].applies,
	);

	return {
		frameworkAppliedBySP,
	};
};
