import { isString } from '../isString/isString';
import { storage } from '../storage/storage';
import type {
	LogCall,
	TeamName,
	TeamStyle,
	TeamSubscription,
} from './@types/logger';
import { STORAGE_KEY } from './storage-key';
import { commonStyle, isTeam, teamStyles } from './teamStyles';

const allStyles = { ...teamStyles, ...commonStyle };

const messageStyle = (teamStyle: TeamStyle): string => {
	const { background, font } = allStyles[teamStyle];
	return `background: ${background}; color: ${font}; padding: 2px 3px; border-radius:3px`;
};

const getTeamSubscriptions = (): TeamName[] => {
	const teams: unknown = storage.local.get(STORAGE_KEY);
	if (!isString(teams)) return [];
	return teams.split(',').filter(isTeam);
};

/**
 * Subscribe to a team’s log
 * @param team the team’s unique ID
 */
const subscribeTo: TeamSubscription = (team) => {
	const teamSubscriptions: string[] = getTeamSubscriptions();
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
	const teamSubscriptions: string[] = getTeamSubscriptions().filter(
		(t) => t !== team,
	);
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
	if (!getTeamSubscriptions().includes(team)) return;

	const styles = [messageStyle('common'), '', messageStyle(team), ''];

	console.log(`%c@guardian%c %c${team}%c`, ...styles, ...args);
};
