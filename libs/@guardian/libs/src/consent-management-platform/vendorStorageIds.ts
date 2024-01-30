import type { VendorName } from './vendors';

/**
 * This is a list of vendors that store data in localStorage or cookies along with the keys they use (that we know of).
 */

export const vendorStorageIds = {
	a9: {
		localStorage: ['apstagUserAgentClientHints', 'apstagCxMEnabled'],
	},
	inizio: {
		localStorage: ['__bm_s', '__bm_m'],
	},
	criteo: {
		cookies: ['cto_bundle'],
		localStorage: [
			'criteo_fast_bid_expires',
			'cto_bundle',
			'criteo_fast_bid',
			'criteo_pt_cdb_mngr_metrics',
			'__ansync3rdp_criteo',
		],
	},
	comscore: {
		cookies: ['comScore'],
	},

	ipsos: {
		cookies: [
			'DM_SitId1073',
			'DM_SitId1073SecId5802',
			'DotMetrics.AmpCookie',
		],
		localStorage: [
			'DotmetricsSiteData',
			'DotMetricsTimeOnPage',
			'DotMetricsUserId',
			'DotMetricsDeviceGuidId',
		],
	},
	permutive: {
		cookies: ['permutive-id'],
		localStorage: [
			'permutive-data-queries',
			'_pubcid',
			'permutive-pvc',
			'permutive-data-enrichers',
			'permutive-session',
			'permutive-data-misc',
			'permutive-unprocessed-pba',
			'permutive-app',
			'permutive-data-models',
			'permutive-id',
			'permutive-consent',
			'permutive-events-cache',
			'permutive-data-queries',
			'permutive-events-for-page',
			'__permutiveConfigQueryParams',
		],
		sessionStorage: ['__permutiveConfigQueryParams'],
	},
	prebid: {
		localStorage: ['_psegs', '_pubcid_exp'],
	},
	googletag: { cookies: ['__gpi', '__gads'] },
	'google-analytics': {
		cookies: ['_gid', '_ga'],
	},
} satisfies Partial<
	Record<
		VendorName,
		{
			cookies?: string[];
			localStorage?: string[];
			sessionStorage?: string[];
		}
	>
>;

export type VendorWithData = keyof typeof vendorStorageIds;
