import type { Subscription } from './@types/logger';

/** Common Guardian blue label. Do not edit */
export const commonStyle = {
	common: {
		background: '#C1D8FC',
		font: '#052962',
	},
} as const;

/**
 * You can only subscribe to teams from this list.
 * Add your team name below to start logging.
 *
 * Make sure your label has a contrast ratio of 4.5 or more.
 * */
export const subscriptionStyles = {
	commercial: {
		background: '#77EEAA',
		font: '#004400',
	},
	cmp: {
		background: '#FF6BB5',
		font: '#2F0404',
	},
	dotcom: {
		background: '#000000',
		font: '#ff7300',
	},
	design: {
		background: '#185E36',
		font: '#FFF4F2',
	},
	tx: {
		background: '#2F4F4F',
		font: '#FFFFFF',
	},
	supporterRevenue: {
		background: '#0F70B7',
		font: '#ffffff',
	},
	identity: {
		background: '#6F5F8F',
		font: '#ffffff',
	},
	openJournalism: {
		background: '#C74600',
		font: '#FEF9F5',
	},
} as const;

export const isSubscription = (
	subscription: string,
): subscription is Subscription =>
	Object.keys(subscriptionStyles).includes(subscription);
