import { isObject } from '../isObject/isObject';
import { isString } from '../isString/isString';
import type { TeamName } from '../logger/@types/logger';
import { isTeam } from '../logger/teamStyles';
import type { GuardianMeasure } from './@types/measure';

const isGuardianMeasure = (
	measure: PerformanceEntry,
): measure is GuardianMeasure =>
	measure instanceof PerformanceMeasure &&
	isObject(measure.detail) &&
	isString(measure.detail.team) &&
	isTeam(measure.detail.team) &&
	isString(measure.detail.name) &&
	(isString(measure.detail.action) || measure.detail.action === undefined);

/**
 * Retrieve `PerformanceMeasure` generated with `startPerformanceMeasure`.
 * The type is narrowed to `GuardianMeasure` which contains relevant details
 */
export const getMeasures = (
	teams: readonly TeamName[],
): readonly GuardianMeasure[] =>
	window.performance
		.getEntriesByType('measure')
		.filter(isGuardianMeasure)
		.filter((measure) => teams.includes(measure.detail.team));
