import { isNonNullable } from '../isNonNullable/isNonNullable';
import { isString } from '../isString/isString';
import { isSubscription } from '../logger/subscriptions';
import type { Detail } from './@types/measure';

/** Serialisation is an implementation detail */
const SEPARATOR = ':';

export const serialise = ({ subscription, name, action }: Detail) =>
	[subscription, name, action].filter(isNonNullable).join(SEPARATOR);

export const deserialise = (id: string): Detail | undefined => {
	const [subscription, name, action] = id.split(SEPARATOR);
	return isString(subscription) &&
		isSubscription(subscription) &&
		isString(name)
		? { subscription, name, action }
		: undefined;
};
