import waitForExpect from 'wait-for-expect';
import { CMP as actualCMP } from './consent-management-platform/cmp';
import { disable, enable } from './consent-management-platform/disable';
import { getCurrentFramework } from './consent-management-platform/getCurrentFramework';
import { CMP } from './consent-management-platform/types';
import * as packageExports from './index';
import { cmp } from './index';

describe('The package', () => {
	it('exports everything it did before', () => {
		expect(Object.keys(packageExports).sort()).toEqual([
			'ArticleDesign',
			'ArticleDisplay',
			'ArticleElementRole',
			'ArticlePillar',
			'ArticleSpecial',
			'Pillar',
			'cmp',
			'countries',
			'debug',
			'getConsentFor',
			'getCookie',
			'getCountryByCountryCode',
			'getLocale',
			'getMeasures',
			'getSwitches',
			'isBoolean',
			'isNonNullable',
			'isObject',
			'isOneOf',
			'isString',
			'isUndefined',
			'joinUrl',
			'loadScript',
			'log',
			'onConsent',
			'onConsentChange',
			'removeCookie',
			'setCookie',
			'setSessionCookie',
			'startPerformanceMeasure',
			'storage',
			'timeAgo',
		]);
	});
});

// test that type exports have not been removed.
// won't catch new types but I don't know how we can?
export type {
	ArticleFormat,
	ArticleTheme,
	Country,
	CountryCode,
	OphanABEvent,
	OphanABPayload,
	OphanABTestMeta,
	OphanAction,
	OphanComponent,
	OphanComponentEvent,
	OphanComponentType,
	OphanProduct,
	Switches,
} from './index';

// @ts-expect-error: make sure the above list are real exports
export type { ThisTypeDoesNotExist } from './index';

// *************** TESTS for consent-management-platform ***************

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
		const consoleWarn = jest.spyOn(global.console, 'warn');

		cmp.init({ country: 'GB' });
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
		const mockCmp: CMP = {
			init: () => undefined,
			willShowPrivacyMessage: () => new Promise(() => true),
			willShowPrivacyMessageSync: () => true,
			hasInitialised: () => true,
			showPrivacyManager: () => {},
			version: 'mocked',
			__isDisabled: () => false,
			__disable: () => {},
			__enable: () => {},
		};

		window.guCmpHotFix = {
			cmp: mockCmp,
		};

		jest.resetModules();
		import('./index').then((module) => {
			expect(module.cmp).toEqual(mockCmp);

			window.guCmpHotFix = {};
			jest.resetModules();
			import('./index');
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
