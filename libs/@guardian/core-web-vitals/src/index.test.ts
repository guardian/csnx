import type {
	CLSMetricWithAttribution,
	FCPMetric,
	FIDMetric,
	INPMetricWithAttribution,
	LCPMetricWithAttribution,
	ReportCallback,
	TTFBMetric,
} from 'web-vitals';
import type { CoreWebVitalsPayload } from './@types/CoreWebVitalsPayload';
import { _, bypassCoreWebVitalsSampling, initCoreWebVitals } from './index';

const { coreWebVitalsPayload, reset } = _;

const defaultCoreWebVitalsPayload = {
	page_view_id: '123456',
	browser_id: 'abcdef',
	stage: 'PROD',
	cls: 0.01,
	cls_target: 'ad',
	inp: 180.3,
	inp_target: 'adSlot',
	lcp: 150,
	lcp_target: 'mainMedia',
	fid: 50.5,
	fcp: 100.1,
	ttfb: 9.99,
} satisfies CoreWebVitalsPayload;

const browserId = defaultCoreWebVitalsPayload.browser_id;
const pageViewId = defaultCoreWebVitalsPayload.page_view_id;

jest.mock('web-vitals/attribution', () => ({
	onCLS: (onReport: (metric: CLSMetricWithAttribution) => void) => {
		onReport({
			value: defaultCoreWebVitalsPayload.cls,
			name: 'CLS',
			id: 'cls',
			attribution: {
				largestShiftTarget: 'ad',
			},
			entries: [],
			navigationType: 'navigate',
			rating: 'good',
			delta: defaultCoreWebVitalsPayload.cls,
		} satisfies CLSMetricWithAttribution);
	},
	onLCP: (onReport: (metric: LCPMetricWithAttribution) => void) => {
		onReport({
			value: defaultCoreWebVitalsPayload.lcp,
			name: 'LCP',
			id: 'lcp',
			attribution: {
				element: 'mainMedia',
				timeToFirstByte: 0,
				resourceLoadDelay: 0,
				resourceLoadTime: 0,
				elementRenderDelay: 0,
			},
			entries: [],
			navigationType: 'navigate',
			rating: 'good',
			delta: defaultCoreWebVitalsPayload.lcp,
		} satisfies LCPMetricWithAttribution);
	},
	onINP: (onReport: (metric: INPMetricWithAttribution) => void) => {
		onReport({
			value: defaultCoreWebVitalsPayload.inp,
			name: 'INP',
			id: 'inp',
			attribution: {
				eventTarget: 'adSlot',
			},
			entries: [],
			navigationType: 'navigate',
			rating: 'good',
			delta: defaultCoreWebVitalsPayload.inp,
		} satisfies INPMetricWithAttribution);
	},
	onTTFB: (onReport: ReportCallback) => {
		onReport({
			value: defaultCoreWebVitalsPayload.ttfb,
			name: 'TTFB',
			id: 'ttfb',
			entries: [],
			navigationType: 'navigate',
			rating: 'good',
			delta: defaultCoreWebVitalsPayload.ttfb,
		} satisfies TTFBMetric);
	},
	onFCP: (onReport: ReportCallback) => {
		onReport({
			value: defaultCoreWebVitalsPayload.fcp,
			name: 'FCP',
			id: 'fcp',
			entries: [],
			navigationType: 'navigate',
			rating: 'good',
			delta: defaultCoreWebVitalsPayload.fcp,
		} satisfies FCPMetric);
	},
	onFID: (onReport: ReportCallback) => {
		onReport({
			value: defaultCoreWebVitalsPayload.fid,
			name: 'FID',
			id: 'fid',
			entries: [],
			rating: 'good',
			navigationType: 'navigate',
			delta: defaultCoreWebVitalsPayload.cls,
		} satisfies FIDMetric);
	},
}));

const mockBeacon = jest.fn().mockReturnValue(true);
navigator.sendBeacon = mockBeacon;

const mockConsoleWarn = jest
	.spyOn(console, 'warn')
	.mockImplementation(() => void 0);

const setVisibilityState = (value: DocumentVisibilityState = 'visible') => {
	Object.defineProperty(document, 'visibilityState', {
		writable: true,
		configurable: true,
		value,
	});
};

describe('coreWebVitals', () => {
	beforeEach(() => {
		reset();
	});

	afterAll(() => {
		setVisibilityState();
	});

	it('sends a beacon when sampling is 100%', async () => {
		const mockAddEventListener = jest.spyOn(global, 'addEventListener');

		const sampling = 100 / 100;
		await initCoreWebVitals({
			browserId,
			pageViewId,
			isDev: true,
			sampling,
		});

		expect(mockAddEventListener).toHaveBeenCalledTimes(2);

		setVisibilityState('hidden');
		global.dispatchEvent(new Event('visibilitychange'));
		global.dispatchEvent(new Event('pagehide'));

		expect(mockBeacon).toHaveBeenCalledTimes(1);
	});

	it('does not run web-vitals if sampling is 0%', async () => {
		const sampling = 0 / 100;
		await initCoreWebVitals({
			browserId,
			pageViewId,
			isDev: true,
			sampling,
		});

		setVisibilityState('hidden');
		global.dispatchEvent(new Event('visibilitychange'));
		global.dispatchEvent(new Event('pagehide'));

		expect(mockBeacon).toHaveBeenCalledTimes(0);
		expect(coreWebVitalsPayload).toMatchObject({
			fid: null,
			fcp: null,
			lcp: null,
			ttfb: null,
			cls: null,
			inp: null,
		});
	});

	it('sends a beacon if sampling at 0% but bypassed via hash', async () => {
		window.location.hash = '#bypassCoreWebVitalsSampling';
		const sampling = 0 / 100;
		await initCoreWebVitals({
			browserId,
			pageViewId,
			isDev: true,
			sampling,
		});
		window.location.hash = '';

		global.dispatchEvent(new Event('pagehide'));

		expect(mockBeacon).toHaveBeenCalledTimes(1);
	});

	it('sends a beacon if sampling at 0% but bypassed asynchronously', async () => {
		const sampling = 0 / 100;
		await initCoreWebVitals({
			browserId,
			pageViewId,
			isDev: true,
			sampling,
		});

		expect(mockBeacon).not.toHaveBeenCalled();

		await bypassCoreWebVitalsSampling();

		global.dispatchEvent(new Event('pagehide'));

		expect(mockBeacon).toHaveBeenCalledTimes(1);
	});

	it('only registers pagehide if document is visible', async () => {
		await initCoreWebVitals({
			browserId,
			pageViewId,
			isDev: true,
			sampling: 1,
		});

		setVisibilityState('visible');
		global.dispatchEvent(new Event('visibilitychange'));

		expect(mockBeacon).not.toHaveBeenCalled();
	});
});

describe('Warnings', () => {
	beforeEach(() => {
		reset();
	});

	it('should warn if already initialised', async () => {
		await initCoreWebVitals({ pageViewId, browserId, isDev: true });
		await initCoreWebVitals({ pageViewId, browserId, isDev: true });

		expect(mockConsoleWarn).toHaveBeenCalledWith(
			'initCoreWebVitals already initialised',
			expect.any(String),
		);
	});

	it('expect to be initialised before calling bypassCoreWebVitalsSampling', async () => {
		await bypassCoreWebVitalsSampling();

		expect(mockConsoleWarn).toHaveBeenCalledWith(
			'initCoreWebVitals not yet initialised',
		);

		global.dispatchEvent(new Event('pagehide'));
		expect(mockBeacon).not.toHaveBeenCalled();
	});

	it('should warn if browserId is missing', async () => {
		await initCoreWebVitals({ pageViewId, isDev: true });

		expect(mockConsoleWarn).toHaveBeenCalledWith(
			'browserId or pageViewId missing from Core Web Vitals.',
			expect.any(String),
			expect.objectContaining({ browserId: null }),
		);
	});

	it('should warn if pageViewId is missing', async () => {
		await initCoreWebVitals({ browserId, isDev: true });

		expect(mockConsoleWarn).toHaveBeenCalledWith(
			'browserId or pageViewId missing from Core Web Vitals.',
			expect.any(String),
			expect.objectContaining({ pageViewId: null }),
		);
	});

	it('should warn if sampling is below 0', async () => {
		await initCoreWebVitals({
			browserId,
			pageViewId,
			isDev: true,
			sampling: -0.1,
		});

		expect(mockConsoleWarn).toHaveBeenCalledWith(
			'Core Web Vitals sampling is outside the 0 to 1 range: ',
			-0.1,
		);
	});

	it('should warn if sampling is above 1', async () => {
		await initCoreWebVitals({
			browserId,
			pageViewId,
			isDev: true,
			sampling: 1.1,
		});

		expect(mockConsoleWarn).toHaveBeenCalledWith(
			'Core Web Vitals sampling is outside the 0 to 1 range: ',
			1.1,
		);
	});

	it('should warn if sampling is above at 0%', async () => {
		await initCoreWebVitals({
			browserId,
			pageViewId,
			isDev: true,
			sampling: 0,
		});

		expect(mockConsoleWarn).toHaveBeenCalledWith(
			'Core Web Vitals are sampled at 0%',
		);
	});

	it('should warn if sampling is above at 100%', async () => {
		await initCoreWebVitals({
			browserId,
			pageViewId,
			isDev: true,
			sampling: 1,
		});

		expect(mockConsoleWarn).toHaveBeenCalledWith(
			'Core Web Vitals are sampled at 100%',
		);
	});
});

describe('Endpoints', () => {
	beforeEach(() => {
		reset();
	});

	it('should use CODE URL if isDev', async () => {
		const isDev = true;
		await initCoreWebVitals({ browserId, pageViewId, isDev, sampling: 1 });

		global.dispatchEvent(new Event('pagehide'));

		expect(_.coreWebVitalsPayload.stage).toBe('CODE');
	});

	it('should use PROD URL if isDev is false', async () => {
		const isDev = false;
		await initCoreWebVitals({ browserId, pageViewId, isDev, sampling: 1 });

		global.dispatchEvent(new Event('pagehide'));

		expect(_.coreWebVitalsPayload.stage).toBe('PROD');
	});
});

describe('web-vitals', () => {
	beforeEach(() => {
		reset();
		setVisibilityState();
	});

	it('should not send data if FCP is null', async () => {
		const isDev = true;
		await initCoreWebVitals({ browserId, pageViewId, isDev, sampling: 1 });

		_.coreWebVitalsPayload.fcp = undefined; // simulate a failing FCP

		setVisibilityState('hidden');
		global.dispatchEvent(new Event('visibilitychange'));

		expect(mockBeacon).not.toHaveBeenCalled();
	});
});
