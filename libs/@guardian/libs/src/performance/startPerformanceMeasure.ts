import type { Subscription } from '../logger/@types/logger';
import { log } from '../logger/logger';
import { logPerf } from './log';
import type {} from './@types/measure';
import { serialise } from './serialise';

/** For browser which do not fully support the performance API */
const fallbackDuration = -1;

/** return a pseudo random identifier to prevent duplicate mark names */
const getId = () =>
	Math.trunc(Math.random() * 1_679_615)
		.toString(36)
		.padStart(4, '0');

interface PerformanceMeasurementControls {
	endPerformanceMeasure: () => number;
}

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
	subscription: Subscription,
	name: string,
	action?: string,
): PerformanceMeasurementControls => {
	try {
		const measureName = serialise({ subscription, name, action });
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

				const formattedDuration = Math.ceil(duration);

				logPerf(measureName, formattedDuration);

				return formattedDuration;
			} catch (error) {
				log(subscription, error);
				return fallbackDuration;
			}
		};

		return { endPerformanceMeasure };
	} catch (error) {
		log(subscription, error);
		return { endPerformanceMeasure: () => fallbackDuration };
	}
};
