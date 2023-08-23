import type { Subscription } from '../../logger/@types/logger';

declare global {
	interface Performance {
		/**
		 * Firefox returned `undefined` before v101
		 * @see https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark#browser_compatibility
		 */
		measure(
			measureName: string,
			startOrMeasureOptions?: string | PerformanceMeasureOptions,
			endMark?: string,
		): PerformanceMeasure | undefined;
	}
}

export type Detail = {
	team: Subscription;
	name: string;
	action?: string;
};

export interface GuardianMeasure {
	name: string;
	duration: number;
	startTime: number;
	entryType: 'measure';
	detail: Detail;
	toJson(): string;
}
