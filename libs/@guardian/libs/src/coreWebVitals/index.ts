import type { ReportHandler } from 'web-vitals';
import type { TeamName } from '../logger/@types/logger';
import { log } from '../logger/log';
import type { CoreWebVitalsPayload } from './@types/CoreWebVitalsPayload';
import { roundWithDecimals } from './roundWithDecimals';

enum Endpoints {
	PROD = 'https://performance-events.guardianapis.com/core-web-vitals',
	CODE = 'https://performance-events.code.dev-guardianapis.com/core-web-vitals',
}

const coreWebVitalsPayload: CoreWebVitalsPayload = {
	browser_id: null,
	page_view_id: null,
	fid: null,
	cls: null,
	lcp: null,
	fcp: null,
	ttfb: null,
};

const teamsForLogging: Set<TeamName> = new Set();
let endpoint: Endpoints;
let initialised = false;

const setEndpoint = (isDev: boolean) => {
	endpoint = isDev ? Endpoints.CODE : Endpoints.PROD;
};

let queued = false;
const sendData = (): void => {
	if (queued) return;

	// If we’re missing FCP, the data is unusable in the lake,
	// So we’re not sending anything.
	if (coreWebVitalsPayload.fcp === null) return;

	queued = navigator.sendBeacon(
		endpoint,
		JSON.stringify(coreWebVitalsPayload),
	);

	if (teamsForLogging.size > 0) {
		teamsForLogging.forEach((team) => {
			log(
				team,
				queued
					? 'Core Web Vitals payload successfully queued for transfer'
					: 'Failed to queue Core Web Vitals payload for transfer',
			);
		});
	}
};

const onReport: ReportHandler = (metric) => {
	switch (metric.name) {
		case 'FCP':
			// Browser support: Chromium, Firefox, Safari Technology Preview
			coreWebVitalsPayload.fcp = roundWithDecimals(metric.value);
			break;
		case 'CLS':
			// Browser support: Chromium,
			coreWebVitalsPayload.cls = roundWithDecimals(metric.value);
			break;
		case 'LCP':
			// Browser support: Chromium
			coreWebVitalsPayload.lcp = roundWithDecimals(metric.value);
			break;
		case 'FID':
			// Browser support: Chromium, Firefox, Safari, Internet Explorer (with the polyfill)
			coreWebVitalsPayload.fid = roundWithDecimals(metric.value);
			break;
		case 'TTFB':
			// Browser support: Chromium, Firefox, Safari, Internet Explorer
			coreWebVitalsPayload.ttfb = roundWithDecimals(metric.value);
			break;
	}
};

const listener = (e: Event): void => {
	switch (e.type) {
		case 'visibilitychange':
			if (document.visibilityState === 'hidden') sendData();
			return;
		case 'pagehide':
			sendData();
			return;
	}
};

const getCoreWebVitals = async (): Promise<void> => {
	const webVitals = await import('web-vitals');
	const { getCLS, getFCP, getFID, getLCP, getTTFB } = webVitals;

	getCLS(onReport, false);
	getFID(onReport);
	getLCP(onReport);
	getFCP(onReport);
	getTTFB(onReport);

	// Report all available metrics when the page is unloaded or in background.
	addEventListener('visibilitychange', listener);

	// Safari does not reliably fire the `visibilitychange` on page unload.
	addEventListener('pagehide', listener);
};

type InitCoreWebVitalsOptions = {
	isDev: boolean;

	browserId?: string | null;
	pageViewId?: string | null;

	sampling?: number;
	team?: TeamName;
};

/**
 * Initialise sending Core Web Vitals metrics to a logging endpoint.
 *
 * @param {InitCoreWebVitalsOptions} init - the initialisation options
 * @param init.isDev - used to determine whether to use CODE or PROD endpoints.
 * @param init.browserId - identifies the browser. Usually available via `getCookie({ name: 'bwid' })`. Defaults to `null`
 * @param init.pageViewId - identifies the page view. Usually available on `guardian.config.ophan.pageViewId`. Defaults to `null`
 *
 * @param init.sampling - sampling rate for sending data. Defaults to `0.01`.
 *
 * @param init.team - Optional team to trigger a log event once metrics are queued.
 */
export const initCoreWebVitals = async ({
	browserId = null,
	pageViewId = null,
	sampling = 1 / 100, // 1% of page view by default
	isDev,
	team,
}: InitCoreWebVitalsOptions): Promise<void> => {
	if (initialised) {
		console.warn(
			'initCoreWebVitals already initialised',
			'use the bypassCoreWebVitalsSampling method instead',
		);
		return;
	}

	initialised = true;

	if (team) teamsForLogging.add(team);

	setEndpoint(isDev);

	coreWebVitalsPayload.browser_id = browserId;
	coreWebVitalsPayload.page_view_id = pageViewId;

	if (!browserId || !pageViewId) {
		console.warn(
			'browserId or pageViewId missing from Core Web Vitals.',
			'Resulting data cannot be joined to page view tables',
			{ browserId, pageViewId },
		);
	}

	if (sampling < 0 || sampling > 1) {
		console.warn(
			'Core Web Vitals sampling is outside the 0 to 1 range: ',
			sampling,
		);
	}
	if (sampling === 0) console.warn('Core Web Vitals are sampled at 0%');
	if (sampling === 1) console.warn('Core Web Vitals are sampled at 100%');

	const pageViewInSample = Math.random() < sampling;
	const bypassWithHash =
		window.location.hash === '#bypassCoreWebVitalsSampling';

	if (pageViewInSample || bypassWithHash) return getCoreWebVitals();
};

/**
 * A method to asynchronously send web vitals after initialization.
 * @param team - Optional team to trigger a log event once metrics are queued.
 */
export const bypassCoreWebVitalsSampling = async (
	team?: TeamName,
): Promise<void> => {
	if (!initialised) {
		console.warn('initCoreWebVitals not yet initialised');
		return;
	}
	if (team) teamsForLogging.add(team);
	return getCoreWebVitals();
};

export const _ = {
	coreWebVitalsPayload,
	sendData,
	reset: (): void => {
		initialised = false;
		teamsForLogging.clear();
		queued = false;
		Object.keys(coreWebVitalsPayload).map((key) => {
			coreWebVitalsPayload[key as keyof CoreWebVitalsPayload] = null;
		});
		removeEventListener('visibilitychange', listener);
		removeEventListener('pagehide', listener);
	},
	Endpoints,
};
