import type { CustomVendorConsents } from '../types/tcfv2/CustomVendorConsents';
import type { TCData } from '../types/tcfv2/TCData';

type Command =
	| 'getTCData'
	| 'ping'
	| 'addEventListener'
	| 'removeEventListener'
	| 'getCustomVendorConsents'; // Sourcepoint addition https://documentation.sourcepoint.com/web-implementation/sourcepoint-gdpr-and-tcf-v2-support/__tcfapi-getcustomvendorconsents-api

const api = (command: Command) =>
	new Promise((resolve, reject) => {
		if (window.__tcfapi) {
			window.__tcfapi(command, 2, (result, success) =>
				success
					? resolve(result)
					: /* istanbul ignore next */
					  reject(new Error(`Unable to get ${command} data`)),
			);
		} else {
			reject(new Error('No __tcfapi found on window'));
		}
	});


 /**
 * This function previously used getTCData. However, this has been deprecated.
 * The documentation below suggests using the addEventListener which returns the same object
 * https://docs.sourcepoint.com/hc/en-us/articles/17344938802707-IAB-GDPR-TCF-v2-2-Transition-readiness-
 * @return {*}  {Promise<TCData>}
 */
export const getTCData = (): Promise<TCData> =>
	api('addEventListener') as Promise<TCData>;


export const getCustomVendorConsents = (): Promise<CustomVendorConsents> =>
	api('getCustomVendorConsents') as Promise<CustomVendorConsents>;
