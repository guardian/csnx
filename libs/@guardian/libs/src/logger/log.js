import { isString } from '../isString/isString.js';
import { storage } from '../storage/storage.js';
import { STORAGE_KEY } from './storage-key.js';
import { commonStyle, isTeam, teamStyles } from './teamStyles.js';

const allStyles = { ...teamStyles, ...commonStyle };

/** @typedef {import('./teamStyles').TeamName} TeamName */
/** @typedef {typeof subscribeTo} TeamSubscription */

/** @type {(teamStyle: TeamName | 'common') => string} */
const messageStyle = (teamStyle) => {
	const { background, font } = allStyles[teamStyle];
	return `background: ${background}; color: ${font}; padding: 2px 3px; border-radius:3px`;
};

const getTeamSubscriptions = () => {
	const teams = storage.local.get(STORAGE_KEY);
	if (!isString(teams)) return [];
	return teams.split(',').filter(isTeam);
};

/**
 * Subscribe to a team’s log
 * @param {TeamName} team the team’s unique ID
 */
const subscribeTo = (team) => {
	const teamSubscriptions = getTeamSubscriptions();
	if (!teamSubscriptions.includes(team)) teamSubscriptions.push(team);
	storage.local.set(STORAGE_KEY, teamSubscriptions.join(','));
	log(team, '🔔 Subscribed, hello!');
};

/**
 * Unsubscribe to a team’s log
 * @param {TeamName} team the team’s unique ID
 */
const unsubscribeFrom = (team) => {
	log(team, '🔕 Unsubscribed, good-bye!');
	const teamSubscriptions = getTeamSubscriptions().filter((t) => t !== team);
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
 * @param {TeamName} team
 * @param {unknown[]} args
 */
export const log = (team, ...args) => {
	if (!getTeamSubscriptions().includes(team)) return;

	const styles = [messageStyle('common'), '', messageStyle(team), ''];

	console.log(`%c@guardian%c %c${team}%c`, ...styles, ...args);
};
