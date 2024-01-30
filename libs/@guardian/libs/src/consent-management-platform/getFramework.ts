import type { Framework } from './types';
import type { Country } from './types/countries';

export const getFramework = (countryCode: Country): Framework => {
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
