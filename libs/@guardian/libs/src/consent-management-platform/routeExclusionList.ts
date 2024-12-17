// TODO: Create api to get exclusion list
export const routeExclusionList = [
	'community/2015/sep/02/guardianwitness-send-us-a-story', //info
	'info/2022/oct/28/the-guardian-supporter-plus-terms-and-conditions',
	'info/article/2024/jul/19/digital-print-terms-and-conditions',
	'info/2014/aug/06/guardian-observer-digital-subscriptions-terms-conditions',
	'info/2014/jul/10/guardian-weekly-print-subscription-services-terms-conditions',
	'info/2021/aug/04/guardian-and-observer-voucher-subscription-card-and-home-delivery-subscription-services-terms-and-conditions',
	'help/terms-of-service',
	'info/privacy',
	'help/privacy-policy',
	'info/2014/nov/03/why-your-data-matters-to-us-full-text',
	'info/video/2019/sep/12/the-guardians-privacy-policy-video',
	'info/cookies',
	'about',
	'info/complaints-and-corrections',
	'help/contact-us',
	'community/2015/sep/02/guardianwitness-send-us-a-story',
];

const sectionExclusionList = ['info', 'help', 'community', 'identity'];

// TODO: Search using metadata/tags/pathname
// export const isExcludedFromCMP = (pathname: string): boolean => {
// 	return routeExclusionList.some((route) => pathname === route);
// }

export const isExcludedFromCMP = (pageSection: string): boolean => {
	console.log('pageSection', pageSection);
	return sectionExclusionList.some((section) => section === pageSection);
};
