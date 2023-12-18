import { IdentityAuth } from '@guardian/identity-auth';
import type { CustomClaims } from '@guardian/identity-auth';
import { isOneOf } from '@guardian/libs';

const stages = ['PROD', 'CODE', 'DEV'] as const;
type Stage = (typeof stages)[number];
const isStage = isOneOf(stages);

export type FrontendIdTokenClaims = CustomClaims & {
	email: string;
	braze_uuid: string;
	google_tag_id: string;
};

export type FrontendIdentityAuth = IdentityAuth<never, FrontendIdTokenClaims>;

const getStage = (isDev: boolean, stage: string) =>
	isDev || !isStage(stage) ? 'DEV' : stage;

/**
 * Decide Issuer URL based on Stage.
 *
 * NOTE: These values are specifically are solely for use on www.theguardian.com
 *
 * @param stage
 * @returns issuer URL
 */
const getIssuer = (stage: Stage) =>
	stage === 'PROD'
		? 'https://profile.theguardian.com/oauth2/aus3xgj525jYQRowl417'
		: 'https://profile.code.dev-theguardian.com/oauth2/aus3v9gla95Toj0EE0x7';

/**
 * Decide Client ID based on Stage.
 *
 * NOTE: These values are specifically are solely for use on www.theguardian.com
 *
 * @param stage
 * @returns Client ID
 */
const getClientId = (stage: Stage) =>
	stage === 'PROD' ? '0oa79m1fmgzrtaHc1417' : '0oa53x6k5wGYXOGzm0x7';

const getRedirectUri = (stage: Stage) => {
	switch (stage) {
		case 'PROD':
			return 'https://www.theguardian.com/';
		case 'CODE':
			return 'https://m.code.dev-theguardian.com/';
		case 'DEV':
		default:
			return 'http://localhost:3030/';
	}
};

export const getIdentityAuth = () => {
	if (!window.guardian) {
		throw new Error('window.guardian has not yet been initialized');
	}

	const {
		isDev = false,
		stage = 'PROD',
		switches,
	} = window.guardian.config ?? {};
	const stageOrDev = getStage(isDev, stage);

	window.guardian.identityAuth ||= new IdentityAuth<
		never,
		FrontendIdTokenClaims
	>({
		issuer: getIssuer(stageOrDev),
		clientId: getClientId(stageOrDev),
		redirectUri: getRedirectUri(stageOrDev),
		idCookieSessionRefresh: switches?.idCookieRefresh ?? false,
		scopes: [
			'openid', // required for open id connect, returns an id token
			'profile', // populates the id token with basic profile information
			'email', // populates the id token with the user's email address
			'guardian.discussion-api.private-profile.read.self', // allows the access token to be used to make requests to the discussion api to read the user's profile
			'guardian.discussion-api.update.secure', // allows the access token to be used to make requests to the discussion api to post comments, upvote etc
			'guardian.identity-api.newsletters.read.self', // allows the access token to be used to make requests to the identity api to read the user's newsletter subscriptions
			'guardian.identity-api.newsletters.update.self', // allows the access token to be used to make requests to the identity api to update the user's newsletter subscriptions
			'guardian.identity-api.user.username.create.self.secure', // allows the access token to set the user's username
			'guardian.members-data-api.read.self', // allows the access token to be used to make requests to the members data api to read the user's membership status
			'id_token.profile.theguardian', // populates the id token with application specific profile information
		],
	});

	return window.guardian.identityAuth;
};
