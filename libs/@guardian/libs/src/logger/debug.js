import { log } from './log.js';

/**
 * Only logs in dev environments.
 *
 * @param team {import('./teamStyles').TeamName}
 * @param args[] {unknown[]}
 */
export const debug = (team, ...args) => {
	const isNotProd = window.location.origin !== 'https://www.theguardian.com';
	if (isNotProd) {
		log(team, ...args);
	}
};
