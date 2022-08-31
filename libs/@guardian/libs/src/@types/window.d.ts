import type { TeamSubscription } from '../logger/@types/logger';
import type { Switches } from '../switches/@types/Switches';

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
