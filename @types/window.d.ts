import type { TeamSubscription } from '../libs/@guardian/libs/src/logger/@types/logger';
import type { Switches } from '../libs/@guardian/libs/src/switches/@types/Switches';

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
		};
	}
}
