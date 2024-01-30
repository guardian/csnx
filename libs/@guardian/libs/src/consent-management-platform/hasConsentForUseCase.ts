//import { onConsent } from './onConsent';
import { cmp } from '.';
import { onConsent } from './onConsent';
import { ConsentState } from './types';
import type { ConsentUseCases } from './types/consentUseCases';

export const hasConsentForUseCase = async (useCase: ConsentUseCases): Promise<boolean> =>
{
	if(cmp.hasInitialised())
	{
		const consentState = await onConsent();
		const hasconsent = hasConsentForUseCaseWithConsentState(useCase, consentState);
		return(hasconsent);
	}
	else return(false);
}

export const hasConsentForUseCaseWithConsentState = (useCase: ConsentUseCases, consentState: ConsentState): boolean =>
{

	/*console.log(`consentState.tcfv2?.consents['1']: ${consentState.tcfv2?.consents['1']}`);
	console.log(`consentState.tcfv2?.consents['2']: ${consentState.tcfv2?.consents['2']}`);
	console.log(`consentState.tcfv2?.consents['3']: ${consentState.tcfv2?.consents['3']}`);
	console.log(`consentState.tcfv2?.consents['4']: ${consentState.tcfv2?.consents['4']}`);
	console.log(`consentState.tcfv2?.consents['5']: ${consentState.tcfv2?.consents['5']}`);
	console.log(`consentState.tcfv2?.consents['6']: ${consentState.tcfv2?.consents['6']}`);
	console.log(`consentState.tcfv2?.consents['7']: ${consentState.tcfv2?.consents['7']}`);
	console.log(`consentState.tcfv2?.consents['8']: ${consentState.tcfv2?.consents['8']}`);
	console.log(`consentState.tcfv2?.consents['9']: ${consentState.tcfv2?.consents['9']}`);
	console.log(`consentState.tcfv2?.consents['10']: ${consentState.tcfv2?.consents['10']}`);
	console.log(`consentState.tcfv2?.consents['11']: ${consentState.tcfv2?.consents['11']}`);
	console.log(`consentState.canTarget: ${consentState.canTarget}`);
	*/

	switch(useCase) {
		case "Targeted advertising": return(consentState.canTarget)
 		case "Targeted marketing":{
			if((
					consentState.tcfv2?.consents['1']
					&& consentState.tcfv2?.consents['3']
					&& consentState.tcfv2?.consents['7'])
				|| !consentState.ccpa?.doNotSell
				|| consentState.aus?.personalisedAdvertising)
				return(true)
			else return(false)
		}
		case "Essential": return(true) //could check for allow-list of essential cookies/storage here in the future
		case "No consent required": return(true) //Would we want a use-case like this, perhaps for internal tools?
		default: return(false)
	}

}
