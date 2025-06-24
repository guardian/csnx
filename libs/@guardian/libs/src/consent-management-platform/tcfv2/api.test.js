import {
	getCustomVendorConsents,
	getTCData,
	postCustomConsent,
} from './api.ts';

it('calls the correct IAB api with the correct methods', async () => {
	expect(getTCData()).rejects.toThrow();
	expect(getCustomVendorConsents()).rejects.toThrow();
	expect(postCustomConsent()).rejects.toThrow();

	window.__tcfapi = jest.fn((a, b, cb) => {
		cb({}, true);
	});

	await getTCData();
	await getCustomVendorConsents();
	await postCustomConsent(
		['vendor_id'],
		['purpose_id'],
		['leg_int_purpose_id'],
	);

	expect(window.__tcfapi).toHaveBeenNthCalledWith(
		1,
		'addEventListener',
		expect.any(Number),
		expect.any(Function),
		undefined,
		undefined,
		undefined,
	);

	expect(window.__tcfapi).toHaveBeenNthCalledWith(
		2,
		'getCustomVendorConsents',
		expect.any(Number),
		expect.any(Function),
		undefined,
		undefined,
		undefined,
	);

	expect(window.__tcfapi).toHaveBeenNthCalledWith(
		3,
		'postCustomConsent',
		expect.any(Number),
		expect.any(Function),
		['vendor_id'],
		['purpose_id'],
		['leg_int_purpose_id'],
	);
});
