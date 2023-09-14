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

export type NewsletterApiData = {
	/** unique identifier in kebab-case format*/
	identityName: string;
	/** display name for the newsletter*/
	name: string;
	/** How the newsletter is produced and sent to users */
	category:
		| 'article-based'
		| 'article-based-legacy'
		| 'fronts-based'
		| 'manual-send'
		| 'other';
	/** whether access to the newsletter should restricted - IE not available for any reader to subscribe to */
	restricted: boolean;
	/** The status of the newsletter:
	 *  - **pending**: Initial state after launch - can be promoted, not yet ready to be sent out.
	 *  - **live**: Able to be sent and/or currently being sent out to subscribers
	 *  - **paused**: Currently not live, but might be restarted in future
	 *  - **cancelled**: Permanently cancelled - must still exist in the API for referential integrity
	 */
	status: 'paused' | 'cancelled' | 'live' | 'pending';
	/** whether the user should receive a validation email to confirm they want to subscribe before a subscription request is processed */
	emailConfirmation: boolean;
	brazeSubscribeAttributeName: string;
	brazeSubscribeEventNamePrefix: string;
	brazeNewsletterName: string;
	theme: 'news' | 'opinion' | 'culture' | 'sport' | 'lifestyle' | 'features';
	/** the name of a group used to categorise the newsletters on the Manage My Account page. */
	group: string;
	/** the desired headline for the sign-up article for this newsletter */
	signUpHeadline: string;
	/** the desired description text for the sign-up article for this newsletter */
	signUpDescription: string;
	/** the description text used in embedded in-article sign-up forms for this newsletter */
	signUpEmbedDescription: string;
	/** the EditionId for the edition (if any) this newsletter is primarily intended for*/
	regionFocus?: 'UK' | 'AU' | 'US' | 'INT' | 'EUR';
	/** display text describing how often the newsletter is sent - eg "weekly", "every day" */
	frequency: string;
	/** unique numerical identifier for the newsletter */
	listId: number;
	/** @deprecated a legacy numerical identifier included for backwards compatibility */
	listIdV1: number;
	campaignName?: string;
	campaignCode?: string;
	brazeSubscribeAttributeNameAlternate?: string[];
	// relative url to a dedicated page on theguardian.com for users to sign up to this newsletter
	signupPage?: string;
	// relative url to a page on theguardian.com serving an example of the newsletter
	exampleUrl?: string;
	// asset url for a circular image representing the newsletter
	illustrationCircle?: string;
	// asset url for a 5:3 image representing the newsletter
	illustrationCard?: string;
	creationTimeStamp: number;
	cancellationTimeStamp?: number;
	// the series tag that identifies an article as being an instance of this newsletter
	seriesTag?: string;
	// a campaign tag to add to articles to indicate that the article should include a promotion for this newsletter.
	composerCampaignTag?: string;
	renderingOptions?: NewsletterEmailRenderingOptions;
	// a custom message to display when comfirming to a user that their subscription request was received
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
