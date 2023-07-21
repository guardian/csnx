import type { Metric, ReportHandler } from 'web-vitals';
import type { CoreWebVitalsPayload } from './@types/CoreWebVitalsPayload';
import { _, bypassCoreWebVitalsSampling, initCoreWebVitals } from './index';

const { coreWebVitalsPayload, reset } = _;

const defaultCoreWebVitalsPayload: CoreWebVitalsPayload = {
	page_view_id: '123456',
	browser_id: 'abcdef',
	fid: 50.5,
	fcp: 100.1,
	lcp: 150,
	ttfb: 9.99,
	cls: 0.01,
	inp: 180.3,
};

const browserId = defaultCoreWebVitalsPayload.browser_id;
const pageViewId = defaultCoreWebVitalsPayload.page_view_id;

jest.mock('web-vitals', () => ({
	onTTFB: (onReport: ReportHandler) => {
		onReport({
			value: defaultCoreWebVitalsPayload.ttfb,
			name: 'TTFB',
		} as Metric);
	},
	onFCP: (onReport: ReportHandler) => {
		onReport({
			value: defaultCoreWebVitalsPayload.fcp,
			name: 'FCP',
		} as Metric);
	},
	onCLS: (onReport: ReportHandler) => {
		onReport({
			value: defaultCoreWebVitalsPayload.cls,
			name: 'CLS',
		} as Metric);
	},
	onFID: (onReport: ReportHandler) => {
		onReport({
			value: defaultCoreWebVitalsPayload.fid,
			name: 'FID',
		} as Metric);
	},
	onLCP: (onReport: ReportHandler) => {
		onReport({
			value: defaultCoreWebVitalsPayload.lcp,
			name: 'LCP',
		} as Metric);
	},
	onINP: (onReport: ReportHandler) => {
		onReport({
			value: defaultCoreWebVitalsPayload.inp,
			name: 'INP',
		} as Metric);
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

		expect(mockBeacon).toHaveBeenCalledWith(
			_.Endpoints.CODE,
			expect.any(String),
		);
	});

	it('should use PROD URL if isDev is false', async () => {
		const isDev = false;
		await initCoreWebVitals({ browserId, pageViewId, isDev, sampling: 1 });

		global.dispatchEvent(new Event('pagehide'));

		expect(mockBeacon).toHaveBeenCalledWith(
			_.Endpoints.PROD,
			expect.any(String),
		);
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

		_.coreWebVitalsPayload.fcp = null; // simulate a failing FCP

		setVisibilityState('hidden');
		global.dispatchEvent(new Event('visibilitychange'));

		expect(mockBeacon).not.toHaveBeenCalled();
	});
});
