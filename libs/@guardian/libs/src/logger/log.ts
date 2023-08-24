import { isString } from '../isString/isString';
import { storage } from '../storage/storage';
import type {
	LogCall,
	LogStyle,
	Subscription,
	SubscriptionStyle,
} from './@types/logger';
import { STORAGE_KEY } from './storage-key';
import {
	commonStyle,
	isSubscription,
	subscriptionStyles,
} from './subscriptions';

const logStyles = { ...subscriptionStyles, ...commonStyle };

export const messageStyle = (subscriptionStyle: LogStyle): string => {
	const { background, font } = logStyles[subscriptionStyle];
	return `background: ${background}; color: ${font}; padding: 2px 6px; border-radius:20px`;
};

export const getSubscriptions = (): Subscription[] => {
	const subscriptions: unknown = storage.local.get(STORAGE_KEY);
	if (!isString(subscriptions)) return [];
	return subscriptions.split(',').filter(isSubscription);
};

/**
 * Subscribe to a log
 * @param subscription the subscription ID
 */
const subscribeTo: SubscriptionStyle = (subscription) => {
	const subscriptions: string[] = getSubscriptions();
	if (!subscriptions.includes(subscription)) subscriptions.push(subscription);
	storage.local.set(STORAGE_KEY, subscriptions.join(','));
	log(subscription, '🔔 Subscribed, hello!');
};

/**
 * Unsubscribe from a log
 * @param subscription the subscription ID
 */
const unsubscribeFrom: SubscriptionStyle = (subscription) => {
	log(subscription, '🔕 Unsubscribed, good-bye!');
	const teamSubscriptions: string[] = getSubscriptions().filter(
		(t) => t !== subscription,
	);
	storage.local.set(STORAGE_KEY, teamSubscriptions.join(','));
};

/* istanbul ignore next */
if (typeof window !== 'undefined') {
	window.guardian ||= {};
	window.guardian.logger ||= {
		subscribeTo,
		unsubscribeFrom,
		teams: () => {
			console.warn(
				'guardian.logger.teams() is deprecated - use subscriptions()',
			);
			return Object.keys(subscriptionStyles);
		},
		subscriptions: () => Object.keys(subscriptionStyles),
	};
}

/**
 * Runs in all environments, if local storage values are set.
 */
export const log: LogCall = (team, ...args) => {
	if (!getSubscriptions().includes(team)) return;

	const styles = [messageStyle('common'), '', messageStyle(team), ''];

	console.log(`%c@guardian%c %c${team}%c`, ...styles, ...args);
};
