import { hex } from 'wcag-contrast';
import { storage } from '../storage/storage';
import type { Subscription } from './@types/logger';
import { debug } from './debug';
import { _, isSubscribedTo, log } from './logger';
import { STORAGE_KEY } from './storage-key';
import { subscriptionStyles } from './subscriptions';

const consoleDotLog = jest
	.spyOn(console, 'log')
	.mockImplementation(() => () => undefined);

beforeEach(() => {
	storage.local.clear();
	_.clearSubscriptionsCache();
});

describe('Subscribe and unsubscribe', () => {
	it(`should be able to add subscriptions`, () => {
		expect(isSubscribedTo('commercial')).toBe(false);
		expect(isSubscribedTo('dotcom')).toBe(false);
		expect(isSubscribedTo('cmp')).toBe(false);
		expect(storage.local.get(STORAGE_KEY)).toBeNull();

		_.subscribeTo('commercial');
		_.subscribeTo('dotcom');

		expect(isSubscribedTo('commercial')).toBe(true);
		expect(storage.local.get(STORAGE_KEY)).toContain('commercial');
		expect(isSubscribedTo('dotcom')).toBe(true);
		expect(storage.local.get(STORAGE_KEY)).toContain('dotcom');
		expect(isSubscribedTo('cmp')).toBe(false);
		expect(storage.local.get(STORAGE_KEY)).not.toContain('cmp');

		_.subscribeTo('cmp');

		expect(isSubscribedTo('commercial')).toBe(true);
		expect(storage.local.get(STORAGE_KEY)).toContain('commercial');
		expect(isSubscribedTo('dotcom')).toBe(true);
		expect(storage.local.get(STORAGE_KEY)).toContain('dotcom');
		expect(isSubscribedTo('cmp')).toBe(true);
		expect(storage.local.get(STORAGE_KEY)).toContain('cmp');
	});

	it(`should be able to remove a subscription`, () => {
		expect(isSubscribedTo('commercial')).toBe(false);
		expect(isSubscribedTo('dotcom')).toBe(false);
		expect(storage.local.get(STORAGE_KEY)).toBeNull();

		_.subscribeTo('commercial');
		_.subscribeTo('dotcom');

		expect(isSubscribedTo('commercial')).toBe(true);
		expect(storage.local.get(STORAGE_KEY)).toContain('commercial');
		expect(isSubscribedTo('dotcom')).toBe(true);
		expect(storage.local.get(STORAGE_KEY)).toContain('dotcom');

		_.unsubscribeFrom('dotcom');

		expect(isSubscribedTo('commercial')).toBe(true);
		expect(storage.local.get(STORAGE_KEY)).toContain('commercial');
		expect(isSubscribedTo('dotcom')).toBe(false);
		expect(storage.local.get(STORAGE_KEY)).not.toContain('dotcom');
	});

	it('should return the list of registered subscriptions', () => {
		const subscriptions = window.guardian?.logger?.subscriptions();
		expect(Array.isArray(subscriptions)).toBe(true);
		expect(subscriptions).toContain('cmp');
	});
});

describe('Logs messages for a subscription', () => {
	it(`should not log any messages by default`, () => {
		log('cmp', 'this will not log');
		log('commercial', 'neither will this');
		log('dotcom', 'or this');
		expect(consoleDotLog).not.toHaveBeenCalled();
	});

	const message = 'Hello, world!';
	const subscription = 'cmp';

	it(`should log ${message} for subscription ${subscription}`, () => {
		_.subscribeTo(subscription);
		log(subscription, message);
		expect(consoleDotLog).toHaveBeenNthCalledWith(
			2,
			expect.anything(),
			expect.anything(),
			expect.anything(),
			expect.anything(),
			expect.anything(),
			message,
		);
	});

	it('should log debug messages in dev', () => {
		_.subscribeTo(subscription);
		debug(subscription, message);
		expect(consoleDotLog).toHaveBeenNthCalledWith(
			2,
			expect.anything(),
			expect.anything(),
			expect.anything(),
			expect.anything(),
			expect.anything(),
			message,
		);
	});

	it('should not log debug messages in prod', () => {
		//@ts-expect-error -- we’re modifying the window
		delete window.location;
		//@ts-expect-error -- we only check window.location.origin
		window.location = new URL('https://www.theguardian.com');

		_.subscribeTo(subscription);
		debug(subscription, message);

		expect(consoleDotLog).toHaveBeenCalledTimes(1);
	});
});

describe('Subscription-based logging', () => {
	const subscriptions: Subscription[] = ['cmp', 'commercial', 'dotcom'];

	it.each(subscriptions)(
		`should only log message for subscription: %s`,
		(subscription) => {
			storage.local.set(STORAGE_KEY, subscription);

			for (const _subscription of subscriptions) {
				log(_subscription, `a message for ${_subscription}`);
			}

			expect(consoleDotLog).toHaveBeenNthCalledWith(
				1,
				expect.anything(),
				expect.anything(),
				expect.anything(),
				expect.anything(),
				expect.anything(),
				`a message for ${subscription}`,
			);
		},
	);
});

describe('Puts methods on the window', () => {
	it('should put the logger methods on the window', () => {
		expect(window.guardian).toHaveProperty(
			'logger',
			expect.objectContaining({
				subscribeTo: expect.any(Function),
				unsubscribeFrom: expect.any(Function),
				subscriptions: expect.any(Function),
			}),
		);
	});
});

describe('Ensure labels are accessible', () => {
	it.each(Object.entries(subscriptionStyles))(
		'should have a minimum contrast ratio of 4.5 (AA) for %s',
		(_, colour) => {
			const { font, background } = colour;
			const ratio = hex(font, background);

			expect(ratio).toBeGreaterThanOrEqual(4.5);
		},
	);
});
