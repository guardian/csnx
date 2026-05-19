// cSpell:ignore doesnotexist

import { jest } from '@jest/globals';

const vendorOne = 'd3b07384d113edec49eaa623';
const vendorAlt = 'c157a79031e1c40f85931829';

const tcfv2ConsentNotFound = {
	tcfv2: { vendorConsents: { doesnotexist: true } },
};
const tcfv2ConsentFoundTrueAlt = {
	tcfv2: { vendorConsents: { [vendorAlt]: true } },
};
const tcfv2ConsentFoundTrue = {
	tcfv2: { vendorConsents: { [vendorOne]: true } },
};
const tcfv2ConsentFoundFalse = {
	tcfv2: { vendorConsents: { [vendorOne]: false } },
};
const usnatWithConsent = { usnat: { doNotSell: false } };
const usnatWithoutConsent = { usnat: { doNotSell: true } };
const ausWithConsent = { aus: { personalisedAdvertising: true } };
const ausWithoutConsent = { aus: { personalisedAdvertising: false } };

jest.unstable_mockModule('./vendors', () => ({
	VendorIDs: jest.fn(),
}));

const vendors = await import('./vendors.ts');
const { getConsentFor } = await import('./getConsentFor.ts');

it('throws an error if the vendor found ', () => {
	jest
		.mocked(vendors.VendorIDs)
		.mockReturnValue({ vendorOne: [vendorOne, vendorAlt] });
	expect(() => {
		getConsentFor('doesnotexist', tcfv2ConsentFoundTrue);
	}).toThrow("Vendor 'doesnotexist' not found");
});

test.each([
	['tcfv2 (unknown)', false, 'vendorOne', tcfv2ConsentNotFound],
	['tcfv2', true, 'vendorOne', tcfv2ConsentFoundTrueAlt],
	['tcfv2', true, 'vendorOne', tcfv2ConsentFoundTrue],
	['tcfv2', false, 'vendorOne', tcfv2ConsentFoundFalse],
	['usnat', true, 'vendorOne', usnatWithConsent],
	['usnat', false, 'vendorOne', usnatWithoutConsent],
	['aus', true, 'vendorOne', ausWithConsent],
	['aus', false, 'vendorOne', ausWithoutConsent],
])(
	`In %s mode, returns %s, for vendor %s`,
	(cmpMode, expected, vendor, mock) => {
		jest
			.mocked(vendors.VendorIDs)
			.mockReturnValue({ vendorOne: [vendorOne, vendorAlt] });
		expect(() => {
			getConsentFor(vendor, mock);
		});
	},
);
