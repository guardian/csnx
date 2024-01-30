import { getCookie, setCookie, setSessionCookie } from '@guardian/libs';
import { hasConsentForUseCaseWithConsentState } from './hasConsentForUseCase';
import { onConsent } from './onConsent';
import { ConsentState } from './types';
import type { ConsentUseCases } from './types/consentUseCases';

//TODO?: Write wrappers for the other cookie functions in @guardian/libs

export const cmpGetCookie = async({ useCase, name, shouldMemoize, }: {
	useCase: ConsentUseCases,
	name: string;
	shouldMemoize?: boolean | undefined;
}): Promise<string | null> =>
{
	const consentState = await onConsent();
	return(cmpGetCookieWithConsentState({useCase, consentState, name, shouldMemoize}))
}

export const cmpGetCookieWithConsentState = ({ useCase, consentState, name, shouldMemoize}: {
	useCase: ConsentUseCases,
	consentState: ConsentState,
	name: string;
	shouldMemoize?: boolean | undefined;
}): string | null =>
{
	console.log('in cmpGetCookie');

	if(hasConsentForUseCaseWithConsentState(useCase, consentState))
	{
		return getCookie({name: name, shouldMemoize: shouldMemoize})
	}
	else
	{
		console.error('cmp', `Cannot get cookie ${name} due to missing consent for use-case ${useCase}`)
		return(null)
	}
};

export const cmpSetCookie = async ({ useCase, name, value, daysToLive, isCrossSubdomain, }: {
	useCase: ConsentUseCases,
    name: string;
    value: string;
    daysToLive?: number | undefined;
    isCrossSubdomain?: boolean | undefined;
}): Promise<void> =>
{
	const consentState = await onConsent();
	return(cmpSetCookieWithConsentState({useCase, consentState, name, value, daysToLive, isCrossSubdomain}))
}

export const cmpSetCookieWithConsentState = ({ useCase, consentState, name, value, daysToLive, isCrossSubdomain, }: {
	useCase: ConsentUseCases,
	consentState: ConsentState,
    name: string;
    value: string;
    daysToLive?: number | undefined;
    isCrossSubdomain?: boolean | undefined;
}): void =>
{
	console.log('in cmpSetCookie');

	if(hasConsentForUseCaseWithConsentState(useCase, consentState))
	{
		setCookie({name:name, value:value, daysToLive:daysToLive, isCrossSubdomain:isCrossSubdomain})
	}
	else
	{
		console.error('cmp', `Cannot set cookie ${name} due to missing consent for use-case ${useCase}`)
	}
};

export const cmpSetSessionCookie = async ({ useCase, name, value }: {
	useCase: ConsentUseCases,
    name: string;
    value: string;
}): Promise<void> =>
{
	const consentState = await onConsent();
	return(cmpSetSessionCookieWithConsentState({useCase, consentState, name, value}))
};

export const cmpSetSessionCookieWithConsentState= async ({ useCase, consentState, name, value }: {
	useCase: ConsentUseCases,
	consentState: ConsentState,
    name: string;
    value: string;
}): Promise<void> =>
{
	console.log('in cmpSetSessionCookie');

	if(hasConsentForUseCaseWithConsentState(useCase, consentState))
	{
		setSessionCookie({name:name, value:value})
	}
	else
	{
		console.error('cmp', `Cannot set cookie ${name} due to missing consent for use-case ${useCase}`)
	}
};
