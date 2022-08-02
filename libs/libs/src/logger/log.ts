import { storage } from '../storage/storage';
import type { LogCall, TeamStyle, TeamSubscription } from './@types/logger';
import { STORAGE_KEY } from './storage-key';
import { teamStyles } from './teamStyles';

const messageStyle = (teamStyle: TeamStyle): string => {
	const { background, font } = teamStyles[teamStyle];
	return `background: ${background}; color: ${font}; padding: 2px 3px; border-radius:3px`;
};

/**
 * Subscribe to a team’s log
 * @param team the team’s unique ID
 */
const subscribeTo: TeamSubscription = (team) => {
	const teamSubscriptions: string[] = storage.local.get(STORAGE_KEY)
		? (storage.local.get(STORAGE_KEY) as string).split(',')
		: [];
	if (!teamSubscriptions.includes(team)) teamSubscriptions.push(team);
	storage.local.set(STORAGE_KEY, teamSubscriptions.join(','));
	log(team, '🔔 Subscribed, hello!');
};

/**
 * Unsubscribe to a team’s log
 * @param team the team’s unique ID
 */
const unsubscribeFrom: TeamSubscription = (team) => {
	log(team, '🔕 Unsubscribed, good-bye!');
	const teamSubscriptions: string[] = (storage.local.get(STORAGE_KEY) as string)
		.split(',')
		.filter((t) => t !== team);
	storage.local.set(STORAGE_KEY, teamSubscriptions.join(','));
};

/* istanbul ignore next */
if (typeof window !== 'undefined') {
	window.guardian ||= {};
	window.guardian.logger ||= {
		subscribeTo,
		unsubscribeFrom,
		teams: () => Object.keys(teamStyles),
	};
}

/**
 * Runs in all environments, if local storage values are set.
 */

export const log: LogCall = (team, ...args) => {
	// TODO add check for localStorage
	if (!((storage.local.get(STORAGE_KEY) || '') as string).includes(team)) {
		return;
	}

	const styles = [messageStyle('common'), '', messageStyle(team), ''];

	console.log(`%c@guardian%c %c${team}%c`, ...styles, ...args);
};
