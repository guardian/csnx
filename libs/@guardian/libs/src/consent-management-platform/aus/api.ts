import type { GlobalEnterpriseConsents } from '../types/aus';

type Command = 'getGlobalEnterpriseConsents';

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
