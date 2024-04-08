import type { GPPData } from '../types/ccpa';

type Command = 'ping';

const api = (command: Command) =>
	new Promise((resolve, reject) => {
		if (window.__gpp) {
			window.__gpp(command, (result, success) =>
				success
					? resolve(result)
					: /* istanbul ignore next */
						reject(new Error(`Unable to get ${command} data`)),
			);
		} else {
			reject(new Error('No __gpp found on window'));
		}
	});
export const getGPPData = (): Promise<GPPData> =>
	api('ping') as Promise<GPPData>;
