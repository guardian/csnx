import { getCookie } from '@guardian/libs';

const AB_TEST_COOKIE_NAME = 'gu_client_ab_tests';
const AB_TEST_GROUP_PREFIX = 'identity-and-trust-consent-rr-banner-us:';
const AB_TEST_GEO_REGION_COOKIE = 'GU_geo_country_region';
const AB_TEST_US_STATES = [
	'WA', // Washington
	'NC', // North Carolina
	'OH', // Ohio
	'SC', // South Carolina
	'MI', // Michigan
	'AZ', // Arizona
	'MO', // Missouri
	'WI', // Wisconsin
	'DC', // District of Columbia
	'KS', // Kansas
	'NM', // New Mexico
	'ME', // Maine
];

export const isInUsStateForAbTest = (): boolean => {
	const usStateCookie = getCookie({
		name: AB_TEST_GEO_REGION_COOKIE,
	});

	if (usStateCookie?.split('-')[0] !== 'US') {
		return false;
	}

	const usState = usStateCookie.split('-')[1] ?? '';
	return AB_TEST_US_STATES.includes(usState);
};

export const getUsAbTestGroup = (): string | undefined => {
	const usAbTestCookie = getCookie({
		name: AB_TEST_COOKIE_NAME,
	});
	const testGroups = usAbTestCookie?.split(',') ?? [];
	const usAbTestGroup = testGroups
		.find((group) => group.startsWith(AB_TEST_GROUP_PREFIX))
		?.split(':')[1];
	return usAbTestGroup;
};

/**
 * This function checks if the user is in the AB test group for the US banner.
 *
 * @return {*}  {boolean}
 */
export const isUserInAbTest = (): boolean => {
	const usAbTestGroup = getUsAbTestGroup();
	return isInUsStateForAbTest() && usAbTestGroup !== undefined;
};
