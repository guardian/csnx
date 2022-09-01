import { isBoolean } from '../isBoolean/isBoolean';
import { isObject } from '../isObject/isObject';
import type { Switches } from './@types/Switches';

const URL = 'https://www.theguardian.com/switches.json';

const validate = (switches: unknown) =>
	isObject(switches) && Object.values(switches).every(isBoolean);

const fetchSwitches = () =>
	fetch(URL)
		.then((response) => response.json())
		.then((switches) =>
			validate(switches)
				? (switches as Switches)
				: Promise.reject(
						new Error(
							'Error getting remote switches – config is malformed',
						),
				  ),
		);

// cache to store any retrieved switches
let switches: Switches | undefined;

/**
 * Get the active guardian switch config
 */

export const getSwitches = async (): Promise<Switches> =>
	(switches ||= window.guardian?.config?.switches ?? (await fetchSwitches()));

export const __resetCachedValue = (): void => (switches = void 0);
