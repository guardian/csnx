import { sign } from 'crypto';
import type { AUSData, GlobalEnterpriseConsents } from '../types/aus';

type Command = 'getUSPData' | 'getGlobalEnterpriseConsents';

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

export const getUSPData = (): Promise<AUSData> =>
	api('getUSPData') as Promise<AUSData>;
const globalEnterpriseApi = (command: Command) =>
	new Promise((resolve, reject) => {
		if (window._sp_?.globalcmp?.getUserConsents) {
			window._sp_.globalcmp.getUserConsents((consents, success) =>
				success
					? resolve({ ...consents, signalStatus: 'ready' })
					: /* istanbul ignore next */
						reject(new Error(`Unable to get ${command} data`)),
			);
		} else {
			resolve({
				applies: false,
				categories: [],
				vendors: [],
				signalStatus: 'not ready',
			} as GlobalEnterpriseConsents);
		}
	});

export const getGlobalEnterpriseConsents =
	(): Promise<GlobalEnterpriseConsents> =>
		globalEnterpriseApi(
			'getGlobalEnterpriseConsents',
		) as Promise<GlobalEnterpriseConsents>;
