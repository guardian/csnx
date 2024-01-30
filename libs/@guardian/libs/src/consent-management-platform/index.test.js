import waitForExpect from 'wait-for-expect';
import { CMP as actualCMP } from './cmp.ts';
import { disable, enable } from './disable.ts';
import { getCurrentFramework } from './getCurrentFramework.ts';
import { cmp } from './index.ts';

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

		cmp.init({ country: 'GB' });
		cmp.init({ country: 'US' });

		expect(CMP.init).not.toHaveBeenCalled();

		enable();
	});

	it('requires country to be set', () => {
		expect(() => {
			cmp.init({ pubData: {} });
		}).toThrow('required');
	});

	it('initializes CMP when in the US', () => {
		cmp.init({ country: 'US' });
		expect(CMP.init).toHaveBeenCalledTimes(1);
	});

	it('initializes CMP when in Australia', () => {
		cmp.init({ country: 'AU' });
		expect(CMP.init).toHaveBeenCalledTimes(1);
	});

	it('initializes TCF when neither in the US or Australia', () => {
		cmp.init({ country: 'GB' });
		expect(CMP.init).toHaveBeenCalledTimes(1);
	});
});

// *************** START commercial.dcr.js hotfix ***************
describe('hotfix cmp.init', () => {
	it('only initialises once per page', () => {
		cmp.init({ country: 'GB' });
		cmp.init({ country: 'GB' });
		cmp.init({ country: 'GB' });
		cmp.init({ country: 'GB' });
		expect(CMP.init).toHaveBeenCalledTimes(1);
		expect(window.guCmpHotFix.initialised).toBe(true);
	});

	it('warn if two versions are running simultaneously', () => {
		global.console.warn = jest.fn();
		cmp.init({ country: 'GB' });
		const currentVersion = window.guCmpHotFix.cmp.version;
		const mockedVersion = 'X.X.X-mock';
		global.guCmpHotFix.cmp.version = mockedVersion;

		cmp.init({ country: 'GB' });

		expect(global.console.warn).toHaveBeenCalledWith(
			'Two different versions of the CMP are running:',
			[currentVersion, mockedVersion],
		);
	});

	it.each([
		['GB', 'tcfv2'],
		['AU', 'aus'],
		['US', 'ccpa'],
		['YT', 'tcfv2'],
		['FR', 'tcfv2'],
		['CA', 'tcfv2'],
		['NZ', 'tcfv2'],
	])('In %s, use the %s framework correctly', (country, framework) => {
		cmp.init({ country });
		expect(getCurrentFramework()).toEqual(framework);
	});

	it('uses window.guCmpHotFix instances if they exist', () => {
		const mockCmp = {
			init: () => undefined,
			willShowPrivacyMessage: () => true,
			willShowPrivacyMessageSync: () => true,
			hasInitialised: () => true,
			mocked: 'mocked',
		};

		window.guCmpHotFix = {
			cmp: mockCmp,
		};

		jest.resetModules();
		import('./index.ts').then((module) => {
			expect(module.cmp).toEqual(mockCmp);

			delete window.guCmpHotFix;
			jest.resetModules();
			import('./index.ts');
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

		cmp.willShowPrivacyMessage().then(() => {
			expect(
				Promise.all([willShowPrivacyMessage1, willShowPrivacyMessage2]),
			).resolves.toEqual([true, true]);
		});
	});
});

describe('cmp.willShowPrivacyMessageSync', () => {
	it('throws if CMP is not initialised', () => {
		expect(() => cmp.willShowPrivacyMessageSync()).toThrow();
	});

	it('does not throw if CMP is initialised', () => {
		cmp.init({ country: 'GB' });

		cmp.willShowPrivacyMessage().then(() => {
			expect(() => cmp.willShowPrivacyMessageSync()).not.toThrow();
		});
	});
});

describe('cmp.hasInitialised', () => {
	it('returns false if CMP is not initialised', () => {
		expect(cmp.hasInitialised()).toBe(false);
	});

	it('returns true when CMP is initialised', () => {
		cmp.init({ country: 'GB' });

		cmp.willShowPrivacyMessage().then(() => {
			expect(cmp.hasInitialised()).toBe(true);
		});
	});
});

describe('cmp.showPrivacyManager', () => {
	it('shows CMP privacy manager when in the US', () => {
		cmp.init({ country: 'US' });

		cmp.showPrivacyManager();

		return waitForExpect(() =>
			expect(CMP.showPrivacyManager).toHaveBeenCalledTimes(1),
		);
	});

	it('shows CMP privacy manager when in Australia', () => {
		cmp.init({ country: 'AU' });

		cmp.showPrivacyManager();

		return waitForExpect(() =>
			expect(CMP.showPrivacyManager).toHaveBeenCalledTimes(1),
		);
	});
	it('shows TCF privacy manager when neither in the US or Australia', () => {
		cmp.init({ country: 'GB' });

		cmp.showPrivacyManager();

		return waitForExpect(() =>
			expect(CMP.showPrivacyManager).toHaveBeenCalledTimes(1),
		);
	});
});
