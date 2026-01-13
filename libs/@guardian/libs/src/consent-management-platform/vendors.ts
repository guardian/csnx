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

export const TCFV2VendorIDs = {
	// keep the list in README.md up to date with these values
	a9: ['5f369a02b8e05c308701f829'],
	acast: ['5f203dcb1f0dea790562e20f'],
	adYouLike: ['5f2d22a5b8e05c028e5c2e97'],
	braze: ['5ed8c49c4b8ce4571c7ad801'],
	comscore: ['5efefe25b8e05c06542b2a77'],
	criteo: ['5e98e7f1b8e05c111d01b462'],
	'google-mobile-ads': ['5f1aada6b8e05c306c0597d7'],
	'google-tag-manager': ['5e952f6107d9d20c88e7c975'],
	googletag: ['5f1aada6b8e05c306c0597d7'],
	groupM: ['5e37fc3e56a5e66147767231'],
	ias: ['5e7ced57b8e05c485246ccf3'],
	id5: ['5ee15bc7b8e05c16366599cb'],
	inizio: ['5e37fc3e56a5e6615502f9c9'],
	ipsos: ['5fa51b29a228638b4a1980e4'],
	indexExchange: ['5e7ced57b8e05c485246ccd8'],
	liveramp: ['5eb559cfb8e05c2bbe33f3f3'],
	magnite: ['5e7ced57b8e05c485246cce5'],
	nielsen: ['5ef5c3a5b8e05c69980eaa5b'],
	ophan: ['5f203dbeeaaaa8768fd3226a'],
	openX: ['5e865b36b8e05c6f984a37e6'],
	ozone: ['5e7ced57b8e05c5a7d171cd3'],
	permutive: ['5f369a02b8e05c2f2d546a40'],
	pubmatic: ['5eab3d5ab8e05c241a63c5db'],
	qm: ['5f295fa4b8e05c76a44c3149'],
	remarketing: ['5ed0eb688a76503f1016578f'],
	sentry: ['5f0f39014effda6e8bbd2006'],
	teads: ['5eab3d5ab8e05c2bbe33f399'],
	theTradeDesk: ['5e865b36b8e05c48537f60a7'],
	twitter: ['5e71760b69966540e4554f01'],
	xandr: ['5e7ced57b8e05c4854221bba'],
	'youtube-player': ['5e7ac3fae30e7d1bc1ebf5e8'],
} satisfies VendorIDType;

export const AusVendorIDs = {
	redplanet: ['not-tcfv2-vendor'],
} satisfies VendorIDType;

export const UsVendorIDs = {
	admiral: ['not-tcfv2-vendor'],
} satisfies VendorIDType;

export const VendorIDs = {
	...TCFV2VendorIDs,
	...AusVendorIDs,
	...UsVendorIDs,
} as const;

export type VendorName = keyof typeof VendorIDs;
