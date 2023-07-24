import type { TeamName } from '../logger/@types/logger';
import type {} from './@types/measure';
import { serialise } from './serialise';

/** For browser which do not fully support the performance API */
const fallback: ReturnType<typeof startPerformanceMeasure> = {
	endPerformanceMeasure: () => -1,
	observeEndMark: () => {
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
 * const { endPerformanceMeasure } = startPerformanceMeasure('dotcom', 'fetch');
 * await fetch('https://www.theguardian.com/uk.json');
 * const duration = endPerformanceMeasure();
 */
export const startPerformanceMeasure = (
	team: TeamName,
	name: string,
	action?: string,
): { endPerformanceMeasure: () => number; observeEndMark: () => void } => {
	if (!('getEntriesByName' in window.performance)) {
		return fallback;
	}

	const measureName = serialise(team, name, action);

	const options = {
		start: performance.now(),
	} satisfies PerformanceMeasureOptions;

	const endPerformanceMeasure = (end?: number) => {
		const { duration } = window.performance.measure(measureName, {
			...options,
			end,
		}) ??
			window.performance.getEntriesByName(measureName, 'measure').at(-1) ?? {
				duration: performance.now() - options.start,
			};

		return Math.ceil(duration);
	};

	const observeEndMark = () =>
		new PerformanceObserver((entries, observer) => {
			const [endMark] = entries.getEntriesByName(measureName);
			if (endMark) {
				endPerformanceMeasure(endMark.startTime);
				observer.disconnect();
			}
		}).observe({ type: 'mark' });

	return { endPerformanceMeasure, observeEndMark };
};
