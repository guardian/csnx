import { ACCOUNT_ID, ENDPOINT } from './lib/sourcepointConfig.ts';
import { init } from './sourcepoint.ts';

const frameworks = ['tcfv2', 'usnat', 'aus'];

describe('Sourcepoint unified', () => {
	beforeEach(() => {
		window.__tcfapi = undefined;
		window.__uspapi = undefined;
		window.__gpp = undefined;
	});
	afterEach(() => {
		window._sp_ = undefined;
	});

	it('should throw error if window._sp_ exists', () => {
		window._sp_ = {};
		expect(init).toThrow();
	});

	it.each(frameworks)(
		"should initialize window._sp_ with the correct config if it doesn't exist",
		(framework) => {
			init(framework);
			expect(window._sp_).toBeDefined();
			expect(window._sp_.config).toBeDefined();
			expect(window._sp_.config.baseEndpoint).toEqual(ENDPOINT);
			expect(window._sp_.config.accountId).toEqual(ACCOUNT_ID);
			expect(window._sp_.config.events).toBeDefined();
			expect(typeof window._sp_.config.events.onConsentReady).toBe('function');
			expect(typeof window._sp_.config.events.onMessageReceiveData).toBe(
				'function',
			);

			if (framework == 'tcfv2') {
				expect(window._sp_.config.gdpr.targetingParams.framework).toEqual(
					framework,
				);
				expect(window._sp_.config.usnat).toBeUndefined();
				expect(window.__tcfapi).toBeDefined();
				expect(window.__uspapi).toBeUndefined();
				expect(window.__gpp).toBeUndefined();
			} else if (framework == 'usnat') {
				expect(window._sp_.config.usnat.includeUspApi).toBeTruthy();
				expect(window._sp_.config.usnat.transitionCCPAAuth).toBeTruthy();
				expect(window._sp_.config.usnat.targetingParams.framework).toEqual(
					framework,
				);
				expect(window._sp_.config.gdpr).toBeUndefined;
				expect(window.__uspapi).toBeDefined();
				expect(window.__tcfapi).toBeUndefined();
				expect(window.__gpp).toBeDefined();
			} else if (framework == 'aus') {
				expect(window._sp_.config.ccpa.targetingParams.framework).toEqual(
					framework,
				);
				expect(window._sp_.config.gdpr).toBeUndefined;
				expect(window.__uspapi).toBeDefined();
				expect(window.__tcfapi).toBeUndefined();
				expect(window.__gpp).toBeUndefined();
			}
		},
	);

	it.each(frameworks)('points at a real file', async (framework) => {
		init(framework);
		expect(document.getElementById('sourcepoint-lib')).toBeTruthy();
		const src = document.getElementById('sourcepoint-lib')?.getAttribute('src');

		const response = await fetch(src);
		expect(response.ok).toBe(true);
	});

	it.each(frameworks)('should accept pubData', (framework) => {
		const now = new Date().getTime();
		init(framework, {
			browserId: 'abc123',
			pageViewId: 'abcdef',
			cmpInitTimeUtc: 1601511014537,
		});
		expect(window._sp_.config.pubData.browserId).toEqual('abc123');
		expect(window._sp_.config.pubData.pageViewId).toEqual('abcdef');
		expect(window._sp_.config.pubData.cmpInitTimeUtc).toBeGreaterThanOrEqual(
			now,
		);
	});

	it.each(frameworks)('should handle no pubData', (framework) => {
		const now = new Date().getTime();
		init(framework);
		expect(window._sp_.config.pubData.cmpInitTimeUtc).toBeGreaterThanOrEqual(
			now,
		);
	});
});
