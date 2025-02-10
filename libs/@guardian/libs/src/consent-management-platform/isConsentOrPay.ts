import type { CountryCode } from '../index.test';
import { isObject } from '../isObject/isObject';
import { storage } from '../storage/storage';
import { consentOrPayCountries } from './lib/sourcepointConfig';
import type { Participations } from './types';

let _isConsentOrPay = false;

export const setIsConsentOrPay = (isConsentOrPay: boolean) => {
	_isConsentOrPay = isConsentOrPay;
};

export const getIsConsentOrPay = (): boolean => {
	return _isConsentOrPay;
};

export const isConsentOrPayCountry = (countryCode: CountryCode) => {
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
