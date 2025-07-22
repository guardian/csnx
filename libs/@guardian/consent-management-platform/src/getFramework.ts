import type { CountryCode } from '@guardian/libs';
import type { ConsentFramework } from './types';

export const getFramework = (countryCode: CountryCode): ConsentFramework => {
	let framework: ConsentFramework;
	switch (countryCode) {
		case 'US':
			framework = 'usnat';
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
