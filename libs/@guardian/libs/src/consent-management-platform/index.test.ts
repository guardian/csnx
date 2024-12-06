import type { CountryCode } from '../countries/@types/CountryCode';
import { CMP as actualCMP } from './cmp';
import { disable, enable } from './disable';
import { getCurrentFramework } from './getCurrentFramework';
import type { CMP as typeCMP } from './types';
import { cmp } from './index';

const resolveAllPromises = () =>
	new Promise((resolve) => process.nextTick(resolve));

const CMP = {
	init: jest.spyOn(actualCMP, 'init'),
	showPrivacyManager: jest.spyOn(actualCMP, 'showPrivacyManager'),
};

beforeEach(() => {
	window._sp_ = undefined;
	window.guCmpHotFix.initialised = false;
	CMP.init.mockClear();
});

describe('cmp.init', () => {
	it('does nothing if CMP is disabled', () => {
		disable();

		cmp.init({ country: 'GB', subscribed: true });
		cmp.init({ country: 'US', subscribed: true });

		expect(CMP.init).not.toHaveBeenCalled();

		enable();
	});

	it('requires country to be set', () => {
		expect(() => {
			cmp.init({ subscribed: true, pubData: {} });
		}).toThrow('required');
	});

	it('initializes CMP when in the US', () => {
		cmp.init({ country: 'US', subscribed: true });
		expect(CMP.init).toHaveBeenCalledTimes(1);
	});

	it('initializes CMP when in Australia', () => {
		cmp.init({ country: 'AU', subscribed: true });
		expect(CMP.init).toHaveBeenCalledTimes(1);
	});

	it('initializes TCF when neither in the US or Australia', () => {
		cmp.init({ country: 'GB', subscribed: true });
		expect(CMP.init).toHaveBeenCalledTimes(1);
	});
});

// *************** START commercial.dcr.js hotfix ***************
describe('hotfix cmp.init', () => {
	it('only initialises once per page', () => {
		cmp.init({ country: 'GB', subscribed: true });
		cmp.init({ country: 'GB', subscribed: true });
		cmp.init({ country: 'GB', subscribed: true });
		cmp.init({ country: 'GB', subscribed: true });
		expect(CMP.init).toHaveBeenCalledTimes(1);
		expect(window.guCmpHotFix.initialised).toBe(true);
	});

	it('warn if two versions are running simultaneously', () => {
		const consoleWarn = jest
			.spyOn(global.console, 'warn')
			.mockImplementation(() => undefined);
		cmp.init({ country: 'GB', subscribed: true });
		const currentVersion = window.guCmpHotFix.cmp?.version;
		const mockedVersion = 'X.X.X-mock';

		const globalWithguCmpHotFix = global as typeof globalThis & {
			guCmpHotFix: typeof window.guCmpHotFix;
		};
		if (globalWithguCmpHotFix.guCmpHotFix.cmp) {
			globalWithguCmpHotFix.guCmpHotFix.cmp.version = mockedVersion;
		}

		cmp.init({ country: 'GB' });

		expect(consoleWarn).toHaveBeenCalledWith(
			'Two different versions of the CMP are running:',
			[currentVersion, mockedVersion],
		);
	});

	it.each([
		['GB', 'tcfv2'],
		['AU', 'aus'],
		['US', 'usnat'],
		['YT', 'tcfv2'],
		['FR', 'tcfv2'],
		['CA', 'tcfv2'],
		['NZ', 'tcfv2'],
	])('In %s, use the %s framework correctly', (country, framework) => {
		cmp.init({ country: country as CountryCode });
		expect(getCurrentFramework()).toEqual(framework);
	});

	it('uses window.guCmpHotFix instances if they exist', () => {
		const mockCmp: typeCMP = {
			init: () => undefined,
			willShowPrivacyMessage: () => new Promise(() => true),
			willShowPrivacyMessageSync: () => true,
			hasInitialised: () => true,
			showPrivacyManager: () => {
				console.warn('This is a dummy for showPrivacyManager');
			},
			version: 'mocked',
			__isDisabled: () => false,
			__disable: () => {
				console.warn('This is a dummy for __disable');
			},
			__enable: () => {
				console.warn('This is a dummy for __enable');
			},
		};

		window.guCmpHotFix.cmp = mockCmp;

		jest.resetModules();
		import('./index')
			.then((module) => {
				expect(module.cmp).toEqual(mockCmp);

				window.guCmpHotFix = {};
				jest.resetModules();
				void import('./index');
			})
			.catch((error) => {
				console.error(error);
			});
	});
});
// *************** END commercial.dcr.js hotfix ***************

describe('cmp.willShowPrivacyMessage', () => {
	it('resolves regardless of when the cmp is initialised', () => {
		// This should be tested in e2e test to be meaningful
		const willShowPrivacyMessage1 = cmp.willShowPrivacyMessage();

		cmp.init({ country: 'US' });

		const willShowPrivacyMessage2 = cmp.willShowPrivacyMessage();

		cmp
			.willShowPrivacyMessage()
			.then(() => {
				expect(Promise.all([willShowPrivacyMessage1, willShowPrivacyMessage2]))
					.resolves.toEqual([true, true])
					.catch((error) => {
						console.error(error);
					});
			})
			.catch((error) => {
				console.error(error);
			});
	});
});

describe('cmp.willShowPrivacyMessageSync', () => {
	it('throws if CMP is not initialised', () => {
		expect(() => cmp.willShowPrivacyMessageSync()).toThrow();
	});

	it('does not throw if CMP is initialised', () => {
		cmp.init({ country: 'GB' });

		cmp
			.willShowPrivacyMessage()
			.then(() => {
				expect(() => cmp.willShowPrivacyMessageSync()).not.toThrow();
			})
			.catch((error) => {
				console.error(error);
			});
	});
});

describe('cmp.hasInitialised', () => {
	it('returns false if CMP is not initialised', () => {
		expect(cmp.hasInitialised()).toBe(false);
	});

	it('returns true when CMP is initialised', () => {
		cmp.init({ country: 'GB' });

		cmp
			.willShowPrivacyMessage()
			.then(() => {
				expect(cmp.hasInitialised()).toBe(true);
			})
			.catch((error) => {
				console.error(error);
			});
	});
});

describe('cmp.showPrivacyManager', () => {
	it('shows CMP privacy manager when in the US', async () => {
		cmp.init({ country: 'US' });

		cmp.showPrivacyManager();
		await resolveAllPromises();

		expect(CMP.showPrivacyManager).toHaveBeenCalledTimes(1);
	});

	it('shows CMP privacy manager when in Australia', async () => {
		cmp.init({ country: 'AU' });

		cmp.showPrivacyManager();
		await resolveAllPromises();

		expect(CMP.showPrivacyManager).toHaveBeenCalledTimes(1);
	});
	it('shows TCF privacy manager when neither in the US or Australia', async () => {
		cmp.init({ country: 'GB' });

		cmp.showPrivacyManager();
		await resolveAllPromises();

		expect(CMP.showPrivacyManager).toHaveBeenCalledTimes(1);
	});
});
