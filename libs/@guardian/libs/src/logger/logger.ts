import { isString } from '../isString/isString';
import { isUndefined } from '../isUndefined/isUndefined';
import { storage } from '../storage/storage';
import type {
	LogCall,
	LogStyle,
	ManageSubscription,
	Subscription,
} from './@types/logger';
import { STORAGE_KEY } from './storage-key';
import {
	commonStyle,
	isSubscription,
	subscriptionStyles,
} from './subscriptions';

/********************************** SUBSCRIPTIONS *****************************/

/**
 * A local cache of subscriptions so we don't have to hit local storage
 * each time.
 */
let SUBSCRIPTIONS_CACHE: SubscriptionCache | undefined;
type SubscriptionCache = Set<Subscription>;

/**
 * Gets the current subscriptions.
 */
const getSubscriptions = (): SubscriptionCache => {
	// if the cache is undefined, we need to populate it
	if (isUndefined(SUBSCRIPTIONS_CACHE)) {
		// Check for subscriptions stored in local storage.
		// This blocks, so we don't want to hit this until we def need it.
		const storedSubscriptions = storage.local.get(STORAGE_KEY);

		if (isString(storedSubscriptions)) {
			SUBSCRIPTIONS_CACHE = new Set(
				storedSubscriptions.split(',').filter(isSubscription),
			);
		} else {
			SUBSCRIPTIONS_CACHE = new Set();
		}
	}

	return SUBSCRIPTIONS_CACHE;
};

/**
 * Subscribe to a log
 * @param subscription the subscription ID
 */
const subscribeTo: ManageSubscription = (subscription) => {
	const subscriptions = getSubscriptions();
	subscriptions.add(subscription);
	storage.local.set(STORAGE_KEY, Array.from(subscriptions).join(','));
	log(subscription, '🔔 Subscribed, hello!');
};

/**
 * Unsubscribe from a log
 * @param subscription the subscription ID
 */
const unsubscribeFrom: ManageSubscription = (subscription) => {
	const subscriptions = getSubscriptions();
	subscriptions.delete(subscription);
	storage.local.set(STORAGE_KEY, Array.from(subscriptions).join(','));
	log(subscription, '🔕 Unsubscribed, good-bye!');
};

/**
 * Check whether a subscription is active
 */
export const isSubscribedTo = (subscription: Subscription): boolean =>
	getSubscriptions().has(subscription);

/************************************ LOGGING *********************************/

const logStyles = { ...subscriptionStyles, ...commonStyle };

export const messageStyle = (subscriptionStyle: LogStyle): string => {
	const { background, font } = logStyles[subscriptionStyle];
	return `background: ${background}; color: ${font}; padding: 2px 6px; border-radius:20px`;
};

/**
 * Log things to console, if the user has subscribed.
 */
export const log: LogCall = (subscription, ...args) => {
	if (isSubscribedTo(subscription)) {
		const styles = [messageStyle('common'), '', messageStyle(subscription), ''];
		console.log(`%c@guardian%c %c${subscription}%c`, ...styles, ...args);
	}
};

/****************************** MAKE IT AVAILABLE *****************************/

// put the logger method on the window object so we can subscribe from the console
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

/*************************************** MISC *********************************/

/**
 * Helpers for unit tests.
 */
export const _ = {
	clearSubscriptionsCache: () => {
		SUBSCRIPTIONS_CACHE = undefined;
	},
	subscribeTo,
	unsubscribeFrom,
};
