import ausData from './aus/__fixtures__/api.getUSPData.json';
import { setCurrentFramework } from './getCurrentFramework.ts';
import { _, invokeCallbacks, onConsentChange } from './onConsentChange.ts';
import customVendorConsents from './tcfv2/__fixtures__/api.getCustomVendorConsents.json';
import tcData from './tcfv2/__fixtures__/api.getTCData.json';
import usnatData from './usnat/__fixtures__/api.getUserConsents.canSell.json';

const resolveAllPromises = () =>
	new Promise((resolve) => process.nextTick(resolve));

beforeEach(() => {
	window.__uspapi = undefined;
	window.__tcfapi = undefined;
	window.__gpp = undefined;
	window.guCmpHotFix = undefined;
});

it('throws an error if no framework is present', () => {
	expect(_.getConsentState).rejects.toThrow(
		'no IAB consent framework found on the page',
	);
});

describe('under USNAT', () => {
	beforeEach(() => {
		window._sp_ = {
			usnat: {
				getUserConsents: jest.fn((cb) => {
					cb(usnatData);
				}),
			},
		};

		setCurrentFramework('usnat');
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

		usnatData.categories.map((category) => {
			category.consented = false; // Opted out
			return category;
		});

		invokeCallbacks();
		await resolveAllPromises();

		expect(callback).toHaveBeenCalledTimes(2);
	});

	it('callbacks executed in correct order', async () => {
		let callbackLastExecuted = {};
		const setCallbackLastExecuted = (callback) => {
			const now = window.performance.now();
			callbackLastExecuted[callback] = now;
		};
		const callback1 = jest.fn(() => setCallbackLastExecuted(1));
		const callback2 = jest.fn(() => setCallbackLastExecuted(2));
		const callback3 = jest.fn(() => setCallbackLastExecuted(3));
		const callback4 = jest.fn(() => setCallbackLastExecuted(4));
		usnatData.categories.map((category) => {
			category.consented = true; // Did not opt out
			return category;
		});

		// callback 3 and 4 registered first with final flag
		onConsentChange(callback3, true);
		onConsentChange(callback4, true);
		onConsentChange(callback1);
		onConsentChange(callback2);

		await resolveAllPromises();
		expect(callback1).toHaveBeenCalledTimes(1);
		expect(callback2).toHaveBeenCalledTimes(1);
		expect(callback3).toHaveBeenCalledTimes(1);
		expect(callback4).toHaveBeenCalledTimes(1);

		// callbacks initially executed in order they were registered in
		expect(callbackLastExecuted[3]).toBeLessThan(callbackLastExecuted[4]);
		expect(callbackLastExecuted[4]).toBeLessThan(callbackLastExecuted[1]);
		expect(callbackLastExecuted[1]).toBeLessThan(callbackLastExecuted[2]);

		// gppData.parsedSections.usnatv1.SaleOptOut = 1; // Opted Out https://github.com/InteractiveAdvertisingBureau/Global-Privacy-Platform/blob/main/Sections/US-National/IAB%20Privacy%E2%80%99s%20National%20Privacy%20Technical%20Specification.md#core-segment
		usnatData.categories.map((category) => {
			category.consented = false; // Opted out
			return category;
		});

		invokeCallbacks();

		await resolveAllPromises();
		expect(callback1).toHaveBeenCalledTimes(2);
		expect(callback2).toHaveBeenCalledTimes(2);
		expect(callback3).toHaveBeenCalledTimes(2);
		expect(callback4).toHaveBeenCalledTimes(2);

		// after consent state change, callbacks were executed in order 1, 2, 3, 4
		expect(callbackLastExecuted[1]).toBeLessThan(callbackLastExecuted[2]);
		expect(callbackLastExecuted[2]).toBeLessThan(callbackLastExecuted[3]);
		expect(callbackLastExecuted[3]).toBeLessThan(callbackLastExecuted[4]);
	});
});

describe('under AUS', () => {
	beforeEach(() => {
		window._sp_ = {
			globalcmp: {
				getUserConsents: jest.fn((callback) => {
					callback(
						{
							applies: true,
							categories: [
								{
									_id: 'PRIVACY_CHOICE_ID_AUSTRALIA',
									consented: true,
								},
							],
							vendors: [],
							signalStatus: 'ready',
						},
						true,
					);
				}),
			},
		};
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

	it('callbacks executed in correct order', async () => {
		let callbackLastExecuted = {};
		const setCallbackLastExecuted = (callback) => {
			const now = window.performance.now();
			callbackLastExecuted[callback] = now;
		};
		const callback1 = jest.fn(() => setCallbackLastExecuted(1));
		const callback2 = jest.fn(() => setCallbackLastExecuted(2));
		const callback3 = jest.fn(() => setCallbackLastExecuted(3));
		const callback4 = jest.fn(() => setCallbackLastExecuted(4));

		ausData.uspString = '1YYN';

		// callback 3 and 4 registered first with final flag
		onConsentChange(callback3, true);
		onConsentChange(callback4, true);
		onConsentChange(callback1);
		onConsentChange(callback2);

		await resolveAllPromises();
		expect(callback1).toHaveBeenCalledTimes(1);
		expect(callback2).toHaveBeenCalledTimes(1);
		expect(callback3).toHaveBeenCalledTimes(1);
		expect(callback4).toHaveBeenCalledTimes(1);

		// callbacks initially executed in order they were registered in
		expect(callbackLastExecuted[3]).toBeLessThan(callbackLastExecuted[4]);
		expect(callbackLastExecuted[4]).toBeLessThan(callbackLastExecuted[1]);
		expect(callbackLastExecuted[1]).toBeLessThan(callbackLastExecuted[2]);

		ausData.uspString = '1YNN';
		invokeCallbacks();

		await resolveAllPromises();
		expect(callback1).toHaveBeenCalledTimes(2);
		expect(callback2).toHaveBeenCalledTimes(2);
		expect(callback3).toHaveBeenCalledTimes(2);
		expect(callback4).toHaveBeenCalledTimes(2);

		// after consent state change, callbacks were executed in order 1, 2, 3, 4
		expect(callbackLastExecuted[1]).toBeLessThan(callbackLastExecuted[2]);
		expect(callbackLastExecuted[2]).toBeLessThan(callbackLastExecuted[3]);
		expect(callbackLastExecuted[3]).toBeLessThan(callbackLastExecuted[4]);
	});
});

describe('under TCFv2', () => {
	beforeEach(() => {
		window.__tcfapi = jest.fn((command, b, callback) => {
			if (command === 'addEventListener') {
				callback(tcData, true);
			}
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

	it('callbacks executed in correct order', async () => {
		let callbackLastExecuted = {};
		const setCallbackLastExecuted = (callback) => {
			const now = window.performance.now();
			callbackLastExecuted[callback] = now;
		};
		const callback1 = jest.fn(() => setCallbackLastExecuted(1));
		const callback2 = jest.fn(() => setCallbackLastExecuted(2));
		const callback3 = jest.fn(() => setCallbackLastExecuted(3));
		const callback4 = jest.fn(() => setCallbackLastExecuted(4));

		tcData.eventStatus = 'cmpuishown';

		// callback 3 and 4 registered first with final flag
		onConsentChange(callback3, true);
		onConsentChange(callback4, true);
		onConsentChange(callback1);
		onConsentChange(callback2);

		await resolveAllPromises();
		expect(callback1).toHaveBeenCalledTimes(0);
		expect(callback2).toHaveBeenCalledTimes(0);
		expect(callback3).toHaveBeenCalledTimes(0);
		expect(callback4).toHaveBeenCalledTimes(0);

		tcData.eventStatus = 'useractioncomplete';

		invokeCallbacks();

		await resolveAllPromises();
		expect(callback1).toHaveBeenCalledTimes(1);
		expect(callback2).toHaveBeenCalledTimes(1);
		expect(callback3).toHaveBeenCalledTimes(1);
		expect(callback4).toHaveBeenCalledTimes(1);

		// callbacks were executed in order 1, 2, 3, 4
		expect(callbackLastExecuted[1]).toBeLessThan(callbackLastExecuted[2]);
		expect(callbackLastExecuted[2]).toBeLessThan(callbackLastExecuted[3]);
		expect(callbackLastExecuted[3]).toBeLessThan(callbackLastExecuted[4]);
	});
});
