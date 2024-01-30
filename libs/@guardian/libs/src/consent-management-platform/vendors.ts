/*********************
 * The list of vendors in this file is used in the function 'getConsentfFor'
 * when additional checks on consent are used.
 *
 * For example when loading an in-page audio player: getConsentFor('acast', state )
 * When vendors are added to Sourcepoint, they only need to be added here if additional consent check are used via the 'getConsentFor' function.
 * When vendors on this list are removed from Sourcepoint, all occurrences of 'getConsentFor( 'vendor' , .) need to be removed from code and then be removed from this list.
 * When a vendor id is changed in Sourcepoint, it also needs to be changed here.
 *
 * When updates are made to this file, all users of the library need to be upgraded to pick up the changes.
 * Important: Keep in sync with list of vendors in README.md
 * *********************/

type VendorIDType = Record<string, string[]>;

export const TCFV2VendorIDs: VendorIDType = {
	// keep the list in README.md up to date with these values
	a9: ['5f369a02b8e05c308701f829'],
	acast: ['5f203dcb1f0dea790562e20f'],
	braze: ['5ed8c49c4b8ce4571c7ad801'],
	comscore: ['5efefe25b8e05c06542b2a77'],
	criteo: ['5e98e7f1b8e05c111d01b462'],
	'google-analytics': ['5e542b3a4cd8884eb41b5a72'],
	'google-mobile-ads': ['5f1aada6b8e05c306c0597d7'],
	'google-tag-manager': ['5e952f6107d9d20c88e7c975'],
	googletag: ['5f1aada6b8e05c306c0597d7'],
	ias: ['5e7ced57b8e05c485246ccf3'],
	inizio: ['5e37fc3e56a5e6615502f9c9'],
	ipsos: ['5fa51b29a228638b4a1980e4'],
	magnite: ['5e7ced57b8e05c485246cce5'],
	nielsen: ['5ef5c3a5b8e05c69980eaa5b'],
	ophan: ['5f203dbeeaaaa8768fd3226a'],
	permutive: ['5f369a02b8e05c2f2d546a40'],
	prebid: ['5f92a62aa22863685f4daa4c'],
	qm: ['5f295fa4b8e05c76a44c3149'],
	remarketing: ['5ed0eb688a76503f1016578f'],
	sentry: ['5f0f39014effda6e8bbd2006'],
	teads: ['5eab3d5ab8e05c2bbe33f399'],
	twitter: ['5e71760b69966540e4554f01'],
	'youtube-player': ['5e7ac3fae30e7d1bc1ebf5e8'],
};

export const AusVendorIDs: VendorIDType = {
	redplanet: ['not-tcfv2-vendor'],
};

export const VendorIDs: VendorIDType = {
	...TCFV2VendorIDs,
	...AusVendorIDs,
};

export type VendorName = keyof typeof VendorIDs;
