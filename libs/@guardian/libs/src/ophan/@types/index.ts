/**
 * an individual A/B test, structured for Ophan
 */
export type OphanABEvent = {
	variantName: string;
	complete: string | boolean;
	campaignCodes?: string[];
};

/**
 * the actual payload we send to Ophan: an object of OphanABEvents with test IDs as keys
 */
export type OphanABPayload = {
	abTestRegister: Record<string, OphanABEvent>;
};

export type OphanProduct =
	| 'CONTRIBUTION'
	| 'RECURRING_CONTRIBUTION'
	| 'MEMBERSHIP_SUPPORTER'
	| 'MEMBERSHIP_PATRON'
	| 'MEMBERSHIP_PARTNER'
	| 'DIGITAL_SUBSCRIPTION'
	| 'PRINT_SUBSCRIPTION';

export type OphanAction =
	| 'INSERT'
	| 'VIEW'
	| 'EXPAND'
	| 'LIKE'
	| 'DISLIKE'
	| 'SUBSCRIBE'
	| 'ANSWER'
	| 'VOTE'
	| 'CLICK'
	| 'ACCEPT_DEFAULT_CONSENT'
	| 'MANAGE_CONSENT'
	| 'CONSENT_ACCEPT_ALL'
	| 'CONSENT_REJECT_ALL'
	| 'STICK'
	| 'CLOSE'
	| 'RETURN'
	| 'SIGN_IN'
	| 'CREATE_ACCOUNT';

export type OphanComponentType =
	| 'READERS_QUESTIONS_ATOM'
	| 'QANDA_ATOM'
	| 'PROFILE_ATOM'
	| 'GUIDE_ATOM'
	| 'TIMELINE_ATOM'
	| 'NEWSLETTER_SUBSCRIPTION'
	| 'SURVEYS_QUESTIONS'
	| 'ACQUISITIONS_EPIC'
	| 'ACQUISITIONS_ENGAGEMENT_BANNER'
	| 'ACQUISITIONS_THANK_YOU_EPIC'
	| 'ACQUISITIONS_HEADER'
	| 'ACQUISITIONS_FOOTER'
	| 'ACQUISITIONS_INTERACTIVE_SLICE'
	| 'ACQUISITIONS_NUGGET'
	| 'ACQUISITIONS_STANDFIRST'
	| 'ACQUISITIONS_THRASHER'
	| 'ACQUISITIONS_EDITORIAL_LINK'
	| 'ACQUISITIONS_MANAGE_MY_ACCOUNT'
	| 'ACQUISITIONS_BUTTON'
	| 'ACQUISITIONS_OTHER'
	| 'APP_ADVERT'
	| 'APP_AUDIO'
	| 'APP_BUTTON'
	| 'APP_CARD'
	| 'APP_CROSSWORDS'
	| 'APP_ENGAGEMENT_BANNER'
	| 'APP_EPIC'
	| 'APP_GALLERY'
	| 'APP_LINK'
	| 'APP_NAVIGATION_ITEM'
	| 'APP_SCREEN'
	| 'APP_THRASHER'
	| 'APP_VIDEO'
	| 'AUDIO_ATOM'
	| 'CHART_ATOM'
	| 'ACQUISITIONS_MERCHANDISING'
	| 'ACQUISITIONS_HOUSE_ADS'
	| 'SIGN_IN_GATE'
	| 'ACQUISITIONS_SUBSCRIPTIONS_BANNER'
	| 'MOBILE_STICKY_AD'
	| 'IDENTITY_AUTHENTICATION'
	| 'RETENTION_ENGAGEMENT_BANNER'
	| 'ACQUISITION_SUPPORT_SITE'
	| 'RETENTION_EPIC'
	| 'CONSENT'
	| 'LIVE_BLOG_PINNED_POST'
	| 'STICKY_VIDEO'
	| 'KEY_EVENT_CARD'
	| 'RETENTION_HEADER'
	| 'SLIDESHOW'
	| 'APP_FEATURE'
	| 'CARD'
	| 'CAROUSEL'
	| 'CONTAINER';

export type OphanComponent = {
	componentType: OphanComponentType;
	id?: string;
	products?: OphanProduct[];
	campaignCode?: string;
	labels?: string[];
};

export type OphanComponentEvent = {
	component: OphanComponent;
	action: OphanAction;
	value?: string;
	id?: string;
	abTest?: {
		name: string;
		variant: string;
	};
};

export type OphanABTestMeta = {
	abTestName: string;
	abTestVariant: string;
	campaignCode: string;
	campaignId?: string;
	componentType: OphanComponentType;
	products?: OphanProduct[];
};

/**
 * Record any data object to Ophan.
 *
 * Typically exposed on `window.guardian.ophan.record`
 *
 * Source: [`ophan/transmit.coffee#L27-L32`](https://github.com/guardian/ophan/blob/ccaa57bcee3f5f3f83ec28973074c9b3f98f1438/tracker-js/assets/coffee/ophan/transmit.coffee#L27-L32)
 */
export type OphanRecordFunction = (
	data: Record<string, unknown>,
	callback?: () => void,
) => void;
