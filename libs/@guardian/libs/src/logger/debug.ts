import type { LogCall } from './@types/logger';
import { log } from './log';

/**
 * Only logs in dev environments.
 */

export const debug: LogCall = (team, ...args) => {
	const isNotProd = window.location.origin !== 'https://www.theguardian.com';
	if (isNotProd) {
		log(team, ...args);
	}
};
