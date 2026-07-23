import { getCookie } from '@guardian/libs';

const AB_TEST_COOKIE_NAME = 'gu_client_ab_tests';
const AB_TEST_GROUP_PREFIX = 'identity-and-trust-us-banner:';
const AB_TEST_GEO_REGION_COOKIE = 'GU_geo_region';
const AB_TEST_US_STATES = ['CA']; // Add more US states here if needed

export const isInUsStateForAbTest = (): boolean => {
	const usStateCookie = getCookie({
		name: AB_TEST_GEO_REGION_COOKIE,
	});
	const usState = usStateCookie?.split('-')[1] ?? '';
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
