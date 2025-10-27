import * as packageExports from './index';

describe('The package', () => {
	it('exports everything it did before', () => {
		expect(Object.keys(packageExports).sort()).toEqual([
			'cmp',
			'getConsentFor',
			'onConsent',
			'onConsentChange',
		]);
	});
});

// test that type exports have not been removed.
// won't catch new types but I don't know how we can?
export type {
	OnConsentChangeCallback,
	CMP,
	ConsentState,
	ConsentFramework,
	VendorName,
	TCEventStatusCode,
	TCFv2ConsentState,
	USNATConsentState,
} from './index';

// @ts-expect-error: make sure the above list are real exports
export type { ThisTypeDoesNotExist } from './index';
