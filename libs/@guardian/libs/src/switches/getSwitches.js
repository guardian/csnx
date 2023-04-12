import { isBoolean } from '../isBoolean/isBoolean';
import { isObject } from '../isObject/isObject';

/** @typedef {Record<string, boolean>} Switches */

const URL = 'https://www.theguardian.com/switches.json';

/** @type {(switches: unknown) => switches is Switches} */
const validate = (switches) =>
	isObject(switches) && Object.values(switches).every(isBoolean);

const fetchSwitches = () =>
	fetch(URL)
		.then((response) => response.json())
		.then((switches) =>
			validate(switches)
				? switches
				: Promise.reject(
						new Error('Error getting remote switches – config is malformed'),
				  ),
		);

// cache to store any retrieved switches
/** @type {Switches | undefined} */
let switches;

/**
 * Get the active guardian switch config
 * @returns {Promise<Switches>}
 */
export const getSwitches = async () =>
	(switches ||= window.guardian?.config?.switches ?? (await fetchSwitches()));

/** @returns {void} */
export const __resetCachedValue = () => (switches = void 0);
