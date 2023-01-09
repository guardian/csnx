# `@guardian/core-web-vitals`

[![npm (scoped)](https://img.shields.io/npm/v/@guardian/core-web-vitals)](https://www.npmjs.com/package/@guardian/core-web-vitals)
[![ES version](https://badgen.net/badge/ES/2020/cyan)](https://tc39.es/ecma262/2020/)
[![npm type definitions](https://img.shields.io/npm/types/@guardian/core-web-vitals)](https://www.typescriptlang.org/)

## Installation

[![Generic badge](https://img.shields.io/badge/google-chat-259082.svg)](https://chat.google.com/room/AAAAWwBdSMs)

```bash
yarn add @guardian/core-web-vitals
```

or

```bash
npm install @guardian/core-web-vitals
```

then

```js
import {
	initCoreWebVitals,
	bypassCoreWebVitalsSampling,
} from '@guardian/core-web-vitals';
```

### Bundling

This package uses `ES2020`.

If your target environment does not support that, make sure you transpile this package when bundling your application.

## Usage

_By default, a sampling rate is set at 1% for which Core Web Vitals will be
gathered and sent. It is possible to set this sampling to a different value
at initialisation or bypass it asynchronously (see below)._

```js
import { initCoreWebVitals, getCookie } from '@guardian/core-web-vitals';

// browserId & pageViewId are needed to join up the data downstream.
const init: InitCoreWebVitalsOptions = {
	browserId: getCookie({ name: 'bwid', shouldMemoize: true }),
	pageViewId: guardian.config.ophan.pageViewId,

	// Whether to use CODE or PROD endpoints.
	isDev: window.location.hostname !== 'www.theguardian.com',
};

initCoreWebVitals(init);
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
};

initCoreWebVitals(init);
```

### `init.team`

Optional team name to log whether the payload has been successfully queued for
transfer.

```ts
const init: InitCoreWebVitalsOptions = {
	isDev: false,
	sampling: 100 / 100,
	team: 'dotcom',
};

initCoreWebVitals(init);

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
});
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
