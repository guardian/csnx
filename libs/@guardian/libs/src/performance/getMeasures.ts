import type { TeamName } from '../logger/@types/logger';
import type { GuardianMeasure } from './@types/measure';
import { deserialise } from './serialise';

/**
 * Retrieve `PerformanceMeasure` generated with `startPerformanceMeasure`.
 * The type is narrowed to `GuardianMeasure` which contains relevant details
 */
export const getMeasures = (
	teams: readonly TeamName[],
): readonly GuardianMeasure[] =>
	window.performance.getEntriesByType('measure').flatMap((measure) => {
		const detail = deserialise(measure.name);
		return measure instanceof PerformanceMeasure &&
			detail &&
			teams.includes(detail.team)
			? { ...measure, detail }
			: [];
	});
