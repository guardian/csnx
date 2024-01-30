import type { CCPAData } from '../types/ccpa';

type Command = 'getUSPData';

const api = (command: Command) =>
	new Promise((resolve, reject) => {
		if (window.__uspapi) {
			window.__uspapi(command, 1, (result, success) =>
				success
					? resolve(result)
					: /* istanbul ignore next */
					  reject(new Error(`Unable to get ${command} data`)),
			);
		} else {
			reject(new Error('No __uspapi found on window'));
		}
	});

export const getUSPData = (): Promise<CCPAData> =>
	api('getUSPData') as Promise<CCPAData>;
