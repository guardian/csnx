import { test } from 'node:test';
import assert from 'node:assert';
import { __TCFV2VendorIDs } from '@guardian/libs';

const cmpBaseUrl = 'cdn.privacy-mgmt.com';
const guardianId = '5ec67f5bb8e05c4a1160fda1';
const guardianVendorListUrl = `https://${cmpBaseUrl}/consent/tcfv2/vendor-list?vendorListId=${guardianId}`;

test('the tcfv2 vendor ids used must be a subset of those known by the IAB as our vendors', async () => {
	const iabGuardianVendorListResponse = await fetch(guardianVendorListUrl);

	const data = await iabGuardianVendorListResponse.json();

	const vendorIds = Object.values(__TCFV2VendorIDs).flat();

	const iabVendorIds = data['vendors'].map((vendor) => vendor['_id']);

	const missingVendorIds = vendorIds.filter((id) => !iabVendorIds.includes(id));

	assert.equal(missingVendorIds.length, 0);
});
