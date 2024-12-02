import type { ConsentFramework } from '../../dist';
import { rejectAllForUser } from './tcfv2/api';

const rejectAll = (framework: ConsentFramework): Promise<void> =>
	// Consider jurisdiction/framework and countries.
	new Promise<void>((resolve, reject) => {
		if (framework === 'tcfv2') {
			rejectAllForUser()
				.then(() => {
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
