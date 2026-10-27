import { getCookie } from '@guardian/libs';

const GEO_REGION_COOKIE = 'GU_geo_country_region';
export const CIPA_US_STATES: string[] = [
	'FL', // Florida
	'IL', // Illinois
	'PA', // Pennsylvania
	'CA', // California
];

/**
 * Checks if the user is in a US state to show CIPA banner.
 *
 * @return {*}  {boolean}
 */
export const isInUsStateForCipaBanner = (): boolean => {
	const usStateCookie = getCookie({
		name: GEO_REGION_COOKIE,
	});

	if (usStateCookie?.split('-')[0] !== 'US') {
		return false;
	}

	const usState = usStateCookie.split('-')[1] ?? '';
	return CIPA_US_STATES.includes(usState);
};
