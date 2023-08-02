import type { TeamName } from '../logger/@types/logger';
import { log } from '../logger/log';
import type {} from './@types/measure';
import { serialise } from './serialise';

/** For browser which do not fully support the performance API */
const fallbackDuration = -1;

/** return a pseudo random identifier to prevent duplicate mark names */
const getId = () =>
	Math.trunc(Math.random() * 1_679_615)
		.toString(36)
		.padStart(4, '0');

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
): { endPerformanceMeasure: () => number } => {
	try {
		const measureName = serialise({ team, name, action });
		const markName = `${measureName}-${getId()}`;
		const start = performance.now();

		// Browser support for `measureOptions` is not good enough,
		// so we have to rely on the side effect of adding a mark.
		// See https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure#measureoptions
		performance.mark(markName);

		const endPerformanceMeasure = () => {
			try {
				const { duration } = window.performance.measure(
					measureName,
					markName,
				) ?? {
					duration: performance.now() - start,
				};

				return Math.ceil(duration);
			} catch (error) {
				log(team, error);
				return fallbackDuration;
			}
		};

		return { endPerformanceMeasure };
	} catch (error) {
		log(team, error);
		return { endPerformanceMeasure: () => fallbackDuration };
	}
};
