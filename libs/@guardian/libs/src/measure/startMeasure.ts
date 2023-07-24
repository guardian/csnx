import type { TeamName } from '../logger/@types/logger';
import type {} from './@types/measure';
import { serialise } from './serialise';

/** For browser which do not fully support the performance API */
const fallback: ReturnType<typeof startMeasure> = {
	endMeasure: () => -1,
	observe: () => {
		/* do nothing… */
	},
};

/**
 * Helper to measure the duration between two events.
 *
 * Once ended, measures are appended to the list of `PerformanceMeasure`
 * and can be retrieved with `performance.getEntriesByType('measure')`
 *
 * @example
 * const { endMeasure } = startMeasure('dotcom', 'fetch');
 * await fetch('https://www.theguardian.com/uk.json');
 * const duration = endMeasure();
 */
export const startMeasure = (
	team: TeamName,
	name: string,
	action?: string,
): { endMeasure: () => number; observe: () => void } => {
	if (!('getEntriesByName' in window.performance)) {
		return fallback;
	}

	const options = {
		start: performance.now(),
	} satisfies PerformanceMeasureOptions;

	const measureName = serialise(team, name, action);

	const endMeasure = (end?: number) => {
		const { duration } = window.performance.measure(measureName, {
			...options,
			end,
		}) ??
			window.performance.getEntriesByName(measureName, 'measure').at(-1) ?? {
				duration: performance.now() - options.start,
			};

		return Math.ceil(duration);
	};

	const observe = () =>
		new PerformanceObserver((entries, observer) => {
			const [endMark] = entries.getEntriesByName(measureName);
			if (endMark) {
				endMeasure(endMark.startTime);
				observer.disconnect();
			}
		}).observe({ type: 'mark' });

	return { endMeasure, observe };
};
