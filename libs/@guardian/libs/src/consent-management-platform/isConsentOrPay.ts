import type { CountryCode } from '../index.test';
import { isObject } from '../isObject/isObject';
import { storage } from '../storage/storage';
import type { Participations } from './types';

export const isConsentOrPayCountry = (countryCode: CountryCode) => {
	const consentOrPayCountries = ['GB'];
	return consentOrPayCountries.includes(countryCode);
};

export const isInConsentOrPayABTest = (): boolean => {
	const participations: Participations = storage.local.get(
		'gu.ab.participations',
	) as Participations;
	return isObject(participations)
		? participations.ConsentOrPayBanner?.variant === 'activate'
		: false;
};
