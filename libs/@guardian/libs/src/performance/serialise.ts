import { isNonNullable } from '../isNonNullable/isNonNullable';
import { isString } from '../isString/isString';
import { isTeam } from '../logger/teamStyles';
import type { Detail } from './@types/measure';

/** Serialisation is an implementation detail */
const SEPARATOR = ':';

export const serialise = ({ team, name, action }: Detail) =>
	[team, name, action].filter(isNonNullable).join(SEPARATOR);

export const deserialise = (id: string): Detail | undefined => {
	const [team, name, action] = id.split(SEPARATOR);
	return isString(team) && isTeam(team) && isString(name)
		? { team, name, action }
		: undefined;
};
