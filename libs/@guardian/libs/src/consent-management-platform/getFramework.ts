import type { CountryCode } from '../countries/@types/CountryCode';
import type { Framework } from './types';

export const getFramework = (countryCode: CountryCode): Framework => {
	let framework: Framework;
	switch (countryCode) {
		case 'US':
			framework = 'ccpa';
			break;

		case 'AU':
			framework = 'aus';
			break;

		case 'GB':
		default:
			framework = 'tcfv2';
			break;
	}

	return framework;
};
