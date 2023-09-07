export type AutomatedFrontSection = {
	subheading: string;
	insertPosition: number;
	frontPath: string;
	sectionName: string;
	maxArticles: number;
	partBuilderFunction: string;
};

export type NewsletterEmailRenderingOptions = {
	linkListSubheading?: string[] | undefined;
	podcastSubheading?: string[] | undefined;
	darkThemeSubheading?: string[] | undefined;
	readMoreSections?:
		| Array<{
				subheading: string;
				wording: string;
				onwardPath?: string;
				isDarkTheme?: boolean;
		  }>
		| undefined;

	automatedFrontSections?: AutomatedFrontSection[] | undefined;
	displayDate: boolean;
	displayStandfirst: boolean;
	contactEmail: string;
	displayImageCaptions: boolean;
	mainBannerUrl?: string;
	subheadingBannerUrl?: string;
	darkSubheadingBannerUrl?: string;
	darkHeadlineBackground?: boolean;
	displayNewsletterName?: boolean;
	paletteOverride?:
		| 'news'
		| 'opinion'
		| 'culture'
		| 'sport'
		| 'lifestyle'
		| 'features';
};

// have excluded some of the fields from the api data which are
// used purely for data collection and workflow management
// internally in the newsletters tool.
// Other application should not rely on these.
export type NewsletterApiData = {
	identityName: string;
	name: string;
	category:
		| 'article-based'
		| 'article-based-legacy'
		| 'fronts-based'
		| 'manual-send'
		| 'other';
	restricted: boolean;
	status: 'paused' | 'cancelled' | 'live' | 'pending';
	emailConfirmation: boolean;
	brazeSubscribeAttributeName: string;
	brazeSubscribeEventNamePrefix: string;
	brazeNewsletterName: string;
	theme: 'news' | 'opinion' | 'culture' | 'sport' | 'lifestyle' | 'features';
	group: string;
	signUpHeadline: string;
	signUpDescription: string;
	signUpEmbedDescription: string;
	regionFocus?: 'UK' | 'AU' | 'US' | 'INTL' | 'EUR';
	frequency: string;
	listId: number;
	listIdV1: number;
	campaignName?: string;
	campaignCode?: string;
	brazeSubscribeAttributeNameAlternate?: string[];
	signupPage?: string;
	exampleUrl?: string;
	illustrationCircle?: string;
	illustrationCard?: string;
	creationTimeStamp: number;
	cancellationTimeStamp?: number;
	seriesTag?: string;
	composerCampaignTag?: string;

	renderingOptions?: NewsletterEmailRenderingOptions;
	mailSuccessDescription?: string;
};

type ApiErrorResponse = {
	ok: false;
	message?: string;
};

type ApiSuccessResponse<T> = {
	ok: true;
	total: number;
	data: T;
};

type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export type NewslettersApiAllNewslettersResponse = ApiResponse<
	NewsletterApiData[]
>;

export type NewslettersApiSingleNewslettersResponse =
	ApiResponse<NewsletterApiData>;
