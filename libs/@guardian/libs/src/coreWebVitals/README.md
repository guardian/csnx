# Core Web Vitals

Reports on Core Web Vitals using Google’s [`web-vitals`] library, and send the
metrics to an logging endpoint when the user leaves the page.

By default, a sampling rate is set at 1% for which Core Web Vitals will be
gathered and sent. It is possible to set this sampling to a different value
as initialisation or bypass it asynchronously.

[`web-vitals`]: https://github.com/GoogleChrome/web-vitals

## Usage

```js
import { initCoreWebVitals, getCookie } from '@guardian/libs';

// browserId & pageViewId are needed to join up the data downstream.
const init: InitCoreWebVitalsOptions = {
    browserId : getCookie({ name: 'bwid', shouldMemoize: true}),
    pageViewId: guardian.config.ophan.pageViewId,

    // Whether to use CODE or PROD endpoints.
    isDev: window.location.hostname !== 'www.theguardian.com',
}

initCoreWebVitals(init)
```

### `init.sampling`

Sets a sampling rate for which to send data to the logging endpoint.

Defaults to `1 / 100`.

```ts
const init: InitCoreWebVitalsOptions = {
    isDev: false,

    // Send data for 20% of page views. Inform Data Tech team about expected
    // spikes in data ingestion
    sampling: 20 / 100,
}

initCoreWebVitals(init)
```

### `init.team`

Optional team name to log whether the payload has been successfully queued for
transfer.

```ts
const init: InitCoreWebVitalsOptions = {
    isDev: false,
    sampling: 100 / 100,
    team: 'dotcom',
}

initCoreWebVitals(init)

// should call log('dotcom', 'Core Web Vitals payload successfully queued […]')
```

### `bypassCoreWebVitalsSampling`

Allows to asynchronously bypass the sampling rate.

Takes an optional team name for which to print logs for.

```ts
/* … after having called initCoreWebVitals() … */

addEventListener('some-event', () => {
    // CWV will be sent for all page views where `some-event` was triggered
    bypassCoreWebVitalsSampling();
})
```


## Types

### `CoreWebVitalsPayload`

```ts
type CoreWebVitalsPayload = {
	page_view_id: string | null;
	browser_id: string | null;
	fid: null | number;
	cls: null | number;
	lcp: null | number;
	fcp: null | number;
	ttfb: null | number;
};
```

### `InitCoreWebVitalsOptions`

```ts
type InitCoreWebVitalsOptions = {
	isDev: boolean;

	browserId?: string | null;
	pageViewId?: string | null;

	sampling?: number;
	team?: TeamName;
};
```
