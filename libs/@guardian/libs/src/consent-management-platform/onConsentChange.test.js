import ausData from './aus/__fixtures__/api.getUSPData.json';
import uspData from './ccpa/__fixtures__/api.getUSPData.json';
import { setCurrentFramework } from './getCurrentFramework.ts';
import { _, invokeCallbacks, onConsentChange } from './onConsentChange.ts';
import customVendorConsents from './tcfv2/__fixtures__/api.getCustomVendorConsents.json';
import tcData from './tcfv2/__fixtures__/api.getTCData.json';

const resolveAllPromises = () =>
	new Promise((resolve) => process.nextTick(resolve));

beforeEach(() => {
	window.__uspapi = undefined;
	window.__tcfapi = undefined;
	window.guCmpHotFix = undefined;
});

it('throws an error if no framework is present', () => {
	expect(_.getConsentState).rejects.toThrow(
		'no IAB consent framework found on the page',
	);
});

describe('under CCPA', () => {
	beforeEach(() => {
		window.__uspapi = jest.fn((command, b, callback) => {
			if (command === 'getUSPData') callback(uspData, true);
		});

		setCurrentFramework('ccpa');
	});

	it('invokes callbacks correctly', async () => {
		const callback = jest.fn();
		const instantCallback = jest.fn();

		onConsentChange(callback);

		expect(callback).toHaveBeenCalledTimes(0);

		invokeCallbacks();
		await resolveAllPromises();

		expect(callback).toHaveBeenCalledTimes(1);

		onConsentChange(instantCallback);
		await resolveAllPromises();

		expect(callback).toHaveBeenCalledTimes(1);
		expect(instantCallback).toHaveBeenCalledTimes(1);
	});

	it('invokes callbacks only if there is a new state', async () => {
		const callback = jest.fn();

		onConsentChange(callback);
		invokeCallbacks();
		await resolveAllPromises();

		expect(callback).toHaveBeenCalledTimes(1);

		invokeCallbacks();
		await resolveAllPromises();

		expect(callback).toHaveBeenCalledTimes(1);

		uspData.uspString = '1YNN';
		invokeCallbacks();
		await resolveAllPromises();

		expect(callback).toHaveBeenCalledTimes(2);
	});
});

describe('under AUS', () => {
	beforeEach(() => {
		window.__uspapi = jest.fn((command, b, callback) => {
			if (command === 'getUSPData') callback(ausData, true);
		});

		// needed to distinguish from US
		setCurrentFramework('aus');
	});

	it('invokes callbacks correctly', async () => {
		const callback = jest.fn();
		const instantCallback = jest.fn();

		onConsentChange(callback);

		expect(callback).toHaveBeenCalledTimes(0);

		invokeCallbacks();
		await resolveAllPromises();

		expect(callback).toHaveBeenCalledTimes(1);

		onConsentChange(instantCallback);
		await resolveAllPromises();

		expect(callback).toHaveBeenCalledTimes(1);
		expect(instantCallback).toHaveBeenCalledTimes(1);
	});

	it('invokes callbacks only if there is a new state', async () => {
		const callback = jest.fn();

		onConsentChange(callback);
		invokeCallbacks();
		await resolveAllPromises();

		expect(callback).toHaveBeenCalledTimes(1);

		invokeCallbacks();
		await resolveAllPromises();

		expect(callback).toHaveBeenCalledTimes(1);

		ausData.uspString = '1YYN';

		invokeCallbacks();
		await resolveAllPromises();

		expect(callback).toHaveBeenCalledTimes(2);
	});
});

describe('under TCFv2', () => {
	beforeEach(() => {
		window.__tcfapi = jest.fn((command, b, callback) => {
			if (command === 'addEventListener') callback(tcData, true);
			if (command === 'getCustomVendorConsents') {
				callback(customVendorConsents, true);
			}
		});
		setCurrentFramework('tcfv2');
	});

	it('invokes callbacks correctly', async () => {
		const callback = jest.fn();
		const instantCallback = jest.fn();

		onConsentChange(callback);

		expect(callback).toHaveBeenCalledTimes(0);

		invokeCallbacks();
		await resolveAllPromises();

		expect(callback).toHaveBeenCalledTimes(1);

		onConsentChange(instantCallback);
		await resolveAllPromises();

		expect(callback).toHaveBeenCalledTimes(1);
		expect(instantCallback).toHaveBeenCalledTimes(1);
	});

	it('invokes callbacks only if there is a new state', async () => {
		const callback = jest.fn();

		onConsentChange(callback);
		invokeCallbacks();
		await resolveAllPromises();

		expect(callback).toHaveBeenCalledTimes(1);

		invokeCallbacks();
		await resolveAllPromises();

		expect(callback).toHaveBeenCalledTimes(1);

		tcData.purpose.consents['1'] = false;
		invokeCallbacks();
		await resolveAllPromises();

		expect(callback).toHaveBeenCalledTimes(2);
	});

	it('invokes callbacks only if there is a user action', async () => {
		const callback = jest.fn();

		tcData.eventStatus = 'cmpuishown';

		onConsentChange(callback);
		invokeCallbacks();
		await resolveAllPromises();

		expect(callback).toHaveBeenCalledTimes(0);

		tcData.eventStatus = 'useractioncomplete';

		invokeCallbacks();
		await resolveAllPromises();

		expect(callback).toHaveBeenCalledTimes(1);

		tcData.eventStatus = 'tcloaded';

		invokeCallbacks();
		await resolveAllPromises();

		expect(callback).toHaveBeenCalledTimes(2);
	});
});
