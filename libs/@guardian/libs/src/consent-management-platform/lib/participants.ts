import { isObject } from '../../isObject/isObject';
import { isString } from '../../isString/isString';
import { storage } from '../../storage/storage';

export type Participations = Record<string, { variant: string }>;

const participationsKey = 'gu.ab.participations';
export const getParticipationsFromLocalStorage = (): Participations => {
	const participations = storage.local.get(participationsKey);
	return isParticipations(participations) ? participations : {};
};

const isParticipations = (
	participations: unknown,
): participations is Participations => {
	return (
		isObject(participations) &&
		Object.values(participations).every(
			(participation) =>
				isObject(participation) && isString(participation.variant),
		)
	);
};
