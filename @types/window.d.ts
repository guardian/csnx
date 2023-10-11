import type { ManageSubscription } from '../libs/@guardian/libs/src/logger/@types/logger';
import type { Switches } from '../libs/@guardian/libs/src/switches/@types/Switches';
import type { google } from '../libs/@guardian/atoms-rendering/src/ima';
import type { ImaManager } from '../libs/@guardian/atoms-rendering/src/YoutubeAtomPlayer';
import type { FrontendIdentityAuth } from '../libs/@guardian/identity-auth-frontend/src';

declare global {
	interface Window {
		guardian?: {
			logger?: {
				subscribeTo: ManageSubscription;
				unsubscribeFrom: ManageSubscription;
				teams: () => string[];
				subscriptions: () => string[];
			};
			config?: {
				page?: {
					isPreview: boolean;
				};
				stage?: string;
				isDev?: boolean;
				switches?: Switches;
			};
			/**
			 * Ophan types are duplicated from DCR. This is intentional. We do
			 * not have an established centralised solution for this type of
			 * code (making tracking requests) but it is an area we are thinking
			 * about. In the meantime, we are keeping use cases separate so that
			 * it will be easier to make any transition to a centralised
			 * solution later
			 *
			 * See:
			 * https://github.com/guardian/dotcom-rendering/blob/88a31f1d74d2fb09d051ff75b513b4cbf31fdd23/dotcom-rendering/src/web/browser/ophan/ophan.ts
			 */
			ophan?: {
				setEventEmitter: () => void; // We don't currently have a custom eventEmitter on DCR - like 'mediator' in Frontend.
				trackComponentAttention: (
					name: string,
					el: Element,
					visiblityThreshold: number,
				) => void;
				record: () => void;
				viewId: string;
				pageViewId: string;
			};
			identityAuth?: FrontendIdentityAuth;
		};
		/**
		 * Here we want to type the google object that will be added to window.
		 * Since the imported google namespace is a value rather than a type, use typeof.
		 */
		google?: typeof google;
		YT?: {
			ImaManager: typeof ImaManager;
		};
	}
}
