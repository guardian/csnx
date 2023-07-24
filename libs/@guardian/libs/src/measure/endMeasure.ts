import type { TeamName } from '../logger/@types/logger';
import { serialise } from './serialise';

/**
 * Typically, the end of a measure should be marked by
 * invoking the return method of `startMeasure`.
 *
 * For measurements that span across module or functional boundaries
 * it is possible to call this method with the same arguments as `startMeasure`
 * to record a `PerformanceMeasure`.
 *
 * The following caveats should be noted with this usage:
 * - there will be no measure recorded without a matching `startMeasure`
 * - the recorded measure may have a negative duration
 */
export const endMeasure = (team: TeamName, name: string, action?: string) => {
	window.performance.mark(serialise(team, name, action));
};
