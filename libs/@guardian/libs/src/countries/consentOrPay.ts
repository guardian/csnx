/**
 * List of country codes where a consent-or-pay subscription model is in operation
 */
export const consentOrPayCountries = [
	'GB',
	'JE',
	'GG',
	'IM',
	'GI',
	'AT',
	'BE',
	'BG',
	'HR',
	'CY',
	'CZ',
	'DK',
	'EE',
	'FI',
	'FR',
	'DE',
	'GR',
	'HU',
	'IS',
	'IE',
	'IT',
	'LV',
	'LT',
	'LU',
	'MT',
	'NL',
	'NO',
	'PL',
	'PT',
	'RO',
	'SK',
	'SI',
	'ES',
	'SE',
	'CH',
];

export type ConsentOrPayCountry = (typeof consentOrPayCountries)[number];

export type ConsentOrPayCurrency = 'GBP' | 'EUR';

/**
 * Currency mapping for consent-or-pay countries
 * Returns EUR unless otherwise specified (to avoid duplicating the list of European countries)
 */
export const consentOrPayCurrencyMap = new Proxy(
	{
		GB: 'GBP' as ConsentOrPayCurrency,
	} as Record<string, ConsentOrPayCurrency>,
	{
		get(target, prop): ConsentOrPayCurrency {
			if (typeof prop === 'string') {
				return target[prop] ?? 'EUR';
			}
			return 'EUR';
		},
	},
);

/**
 * Check if a country code is supported for consent-or-pay functionality.
 */
export const isConsentOrPayCountry = (
	country: string,
): country is ConsentOrPayCountry => {
	return consentOrPayCountries.includes(country);
};
