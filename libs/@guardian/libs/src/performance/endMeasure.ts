import type { TeamName } from '../logger/@types/logger';
import { serialise } from './serialise';

/**
 * Typically, the end of a measure should be marked by
 * invoking the return method of `startPerformanceMeasure`.
 *
 * For measurements that span across module or functional boundaries,
 * call this method with the same arguments as `startPerformanceMeasure`
 * to record a `PerformanceMeasure`.
 *
 * The following caveats should be noted with this usage:
 * - no measure are recorded without a matching `startPerformanceMeasure`
 * - recorded measure may have a negative duration
 */
export const endPerformanceMeasure = (
	team: TeamName,
	name: string,
	action?: string,
) => {
	window.performance.mark(serialise(team, name, action));
};
