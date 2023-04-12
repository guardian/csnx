import type { TeamSubscription } from '../libs/@guardian/libs/src/logger/log.js';
import type { Switches } from '../libs/@guardian/libs/src/switches/getSwitches.js';

declare global {
	interface Window {
		guardian?: {
			logger?: {
				subscribeTo: TeamSubscription;
				unsubscribeFrom: TeamSubscription;
				teams: () => string[];
			};
			config?: {
				page?: {
					isPreview: boolean;
				};
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
		};
	}
}
