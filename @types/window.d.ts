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
