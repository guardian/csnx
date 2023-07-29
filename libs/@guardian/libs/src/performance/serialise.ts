import { isNonNullable } from '../isNonNullable/isNonNullable';
import type { TeamName } from '../logger/@types/logger';

/** Serialisation is an implementation detail */
const SEPARATOR = ':';

export const serialise = (team: TeamName, name: string, action?: string) =>
	['gu', team, name, action].filter(isNonNullable).join(SEPARATOR);
