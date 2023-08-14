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
	// https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType#browser_compatibility
	'getEntriesByType' in window.performance
		? window.performance
				.getEntriesByType('measure')
				.flatMap(({ entryType, name, duration, startTime }) => {
					const detail = deserialise(name);
					return entryType === 'measure' &&
						detail &&
						teams.includes(detail.team)
						? {
								name,
								detail,
								duration,
								entryType,
								startTime,
								toJson: () => JSON.stringify(this),
						  }
						: [];
				})
		: [];
