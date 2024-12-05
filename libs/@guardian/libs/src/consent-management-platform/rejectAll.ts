import { getCurrentFramework } from './getCurrentFramework';
import { invokeCallbacks } from './onConsentChange';
import { rejectAllForUser } from './tcfv2/api';

const rejectAll = (): Promise<void> =>
	// Consider jurisdiction/framework and countries.
	new Promise<void>((resolve, reject) => {
		console.log('Rejecting all');
		if (getCurrentFramework() === 'tcfv2') {
			rejectAllForUser()
				.then(() => {
					invokeCallbacks();
					resolve();
				})
				.catch(() => {
					reject(new Error('Unable to reject all'));
				});
		} else {
			reject(new Error('Framework not supported'));
		}
	});
export { rejectAll };
