# Consent Management Platform

[![npm (scoped)](https://img.shields.io/npm/v/@guardian/consent-management-platform)](https://www.npmjs.com/package/@guardian/consent-management-platform)
[![ES version](https://badgen.net/badge/ES/2020/cyan)](https://tc39.es/ecma262/2020/)
![Types](https://img.shields.io/npm/types/@guardian/consent-management-platform)
[![Coverage Status](https://coveralls.io/repos/github/guardian/consent-management-platform/badge.svg)](https://coveralls.io/github/guardian/consent-management-platform)

> Consent management for `*.theguardian.com`.

The Guardian CMP handles applying the CCPA to users in the USA,
and TCFv2 to everyone else.

## Table of Contents

<!-- toc -->

- [Managing Consent](#managing-consent)
  - [`cmp.init(options)`](#cmpinitoptions)
  - [`cmp.hasInitialised()`](#cmphasinitialised)
  - [`cmp.willShowPrivacyMessage()`](#cmpwillshowprivacymessage)
  - [`cmp.willShowPrivacyMessageSync()`](#cmpwillshowprivacymessagesync)
  - [`cmp.showPrivacyManager()`](#cmpshowprivacymanager)
- [Using Consent](#using-consent)
  - [`onConsentChange(callback, final?)`](#onconsentchangecallback-final)
  - [`onConsent()`](#onconsent)
  - [`getConsentFor(vendor, consentState)`](#getconsentforvendor-consentstate)
- [Disabling Consent](#disabling-consent)
  - [`cmp.__disable()`](#cmp__disable)
  - [`cmp.__enable()`](#cmp__enable)
  - [`cmp.__isDisabled()`](#cmp__isdisabled)
  - [Manually](#manually)
  - [Using Cypress](#using-cypress)
- [Development](#development)

## Managing Consent

```js
import { cmp } from '@guardian/libs';
```

### `cmp.init(options)`

returns: `void`

Adds the relevent privacy framework to the page. It must be called to enable
privacy management.
If necessary, it will also display the initial privacy message.

#### `options.country`

type: `CountryCode` from `@guardian/libs`
values: e.g. `GB`, `US`, `AU`, …

Declare which country your user is in. Required – *throws an error if
it's missing.*

#### `options.pubData`

type: `Object`

Optional additional parameters for reporting.

##### `pubData.pageViewId`

type: `string`

Optional value identifying the unique pageview associated with this instance of the CMP.

Will be used to link back to a `browserId` for further reporting; if possible this should be available via the pageview table.

#### Example

```js
cmp.init({
	country: 'GB',
	pubData: {
		pageViewId: 'jkao3u2kcbaqk',
	},
});
```

### `cmp.hasInitialised()`

returns: `boolean`

Returns `true` if the CMP has initialised.

### `cmp.willShowPrivacyMessage()`

returns: `Promise<Boolean>`

Returns a promise that resolves to `true` if the CMP will show the initial
privacy message once it has initialised, or `false` if not.

#### Example

```js
cmp.willShowPrivacyMessage()
    .then(willShow =>
        if (willShow) {
            console.log("a privacy message will show as soon as it's ready");
            // e.g. don't show any other banners
        } else {
            console.log('a privacy message will not be shown');
            // e.g. show another banner if you like
        }
    );
```

### `cmp.willShowPrivacyMessageSync()`

returns: `Boolean`

_You almost always want to use the async version above._

Returns `true` if the CMP has shown, is showing or will show the initial privacy message. Returns `false` otherwise.

Throws an error if the CMP has not been initialised.

#### Example

```js
if (cmp.hasInitialised()) {
	if (cmp.willShowPrivacyMessageSync()) {
		// do something
	}
}
```

### `cmp.showPrivacyManager()`

Displays an interface that allows users to manage
their privacy settings at any time.

#### Example

```js
cmp.showPrivacyManager();
```

## Using Consent

```js
import {
	onConsent,
	onConsentChange,
	getConsentFor,
} from '@guardian/consent-management-platform';
```

### `onConsentChange(callback, final?)`

returns: `void`

An event listener that invokes callbacks whenever the consent state:

- is acquired (e.g. after initialising)
- changes (eg. if a user changes their privacy preferences)

If the consent state has already been acquired when `onConsentChange` is called,
the callback will be invoked immediately.

Passing `true` for the optional `final` parameter guarantees that the callback
will be executed after all other callbacks that haven't been registered with the flag when consent state changes.
If more than one callback registered with `final = true`, they will be executed in the order in which they were registered
when consent changes.

#### `callback(consentState)`

type: `function`

Reports the user's privacy preferences.

##### `consentState.tcfv2`

type: `Object` or `undefined`

Reports the user's preferences for each of the TCFv2 purposes, the last CMP
event status, custom vendor consents, flag if GDPR applies, the TC string and addtlConsent string.

If the user is either in the USA or Australia, it will be `undefined`.

Unlike the [`__tcfapi`](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md#how-does-the-cmp-provide-the-api), all ten consents will have a set
boolean value, defaulting to `false` where no explicit consent was given.

```js
{
    gdprApplies: Boolean | undefined, // true - GDPR Applies, false - GDPR Does not apply, undefined - unknown whether GDPR Applies
    tcString: String, // 'base64url-encoded TC string with segments'
    addtlConsent: String, // Google AC string
    eventStatus: String, // 'tcloaded' | 'cmpuishown' | 'useractioncomplete'
    consents: {
        1: Boolean,
        2: Boolean,
        /* … */
        9: Boolean,
        10: Boolean,
    },

    vendorConsents: {
        'abcdefghijklmnopqrstuvwx': Boolean,
        'yz1234567890abcdefghijkl': Boolean,
        'mnopqrstuvwxyz1234567890': Boolean,
        // Sourcepoint IDs, etc.
    }
}
```

##### `consentState.ccpa`

type: `Object` or `undefined`

Reports whether user has withdrawn consent to sell their data in the USA.

If the user is not in the USA, it will be `undefined`.

```js
{
	doNotSell: Boolean;
}
```

##### `consentState.aus`

type: `Object` or `undefined`

Reports whether user has withdrawn consent to personalised advertising
in Australia.

If the user is not in Australia, it will be `undefined`.

```js
{
    personalisedAdvertising: Boolean, // True by default
}
```

##### `consentState.canTarget`

type: `boolean`

If the user can be targeted for personalisation according to the active consent framework.

For example `canTarget` would be `true` in the following scenarios:

- for CCPA if the user has _not_ clicked "do not sell",
- for AUS if the user has _not_ opted out of personalised advertising
- for TCFv2 if the user has given consent for all purposes

##### `consentState.framework`

type: `string` | null

The active consent framework e.g. `"ccpa"`, `"aus"`, `"tcfv2"` or `null`.

#### Example

```js
import { onConsentChange } from '@guardian/consent-management-platform';

onConsentChange(({ tcfv2, ccpa, aus }) => {
	if (tcfv2) {
		console.log(tcfv2); // { 1: true || false, 1: true || false, ... }
	}

	if (ccpa) {
		console.log(ccpa); // { doNotSell: true || false }
	}

	if (aus) {
		console.log(aus); // { personalisedAdvertising: true || false }
	}
});
```

### `onConsent()`

A promise wrapper around `onConsentChange` that resolves the initial consent state.

This will only resolve once whereas callbacks passed to `onConsentChange` are executed each time consent state changes. Avoid using this function in contexts where subsequent consent states must be listened for.

returns: `Promise<ConsentState>`

### `getConsentFor(vendor, consentState)`

returns: `boolean`

Gets the consent for a given vendor.

#### `vendor`

type: `string`

<details><summary>Supported vendors</summary>

<!-- keep this list up to date with the VendorIDs in src/getConsentFor.ts -->

#### TCFV2 vendors

- `"a9"`
- `"acast"`
- `"braze"`
- `"comscore"`
- `"criteo"`
- `"google-analytics"`
- `"google-mobile-ads"`
- `"google-tag-manager"`
- `"googletag"`
- `"ias"`
- `"inizio"`
- `"ipsos"`
- `"magnite"` (do not use until contract signed)
- `"nielsen"`
- `"ophan"`
- `"permutive"`
- `"prebid"`
- `"qm"` (Quantum Metric)
- `"redplanet"` (Australia only)
- `"remarketing"`
- `"sentry"`
- `"teads"`
- `"twitter"`
- `"youtube-player"`

#### Aus only Vendors

- `"redplanet"`

</details>
If the vendor you need is missing, please [raise an issue](https://github.com/guardian/consent-management-platform/issues) (or a PR!).

#### `consentState`

type: `Object`

The consent object passed to the `onConsentChange` callback.

#### Example

```js
import {
	onConsentChange,
	getConsentFor,
} from '@guardian/consent-management-platform';

onConsentChange((consentState) => {
	const ga = getConsentFor('google-analytics', consentState); // true
	const comscore = getConsentFor('comscore', consentState); // false

	// throws error
	const eowifnwoeifjoweinf = getConsentFor('eowifnwoeifjoweinf', consentState);

	// you can still use the consent state for a more complicated task
	const complexConsentCondition = myComplexConsentTask(consentState);
});
```

## Disabling Consent

It is possible to disable the CMP entirely in the current browser, which can be useful for testing host applications.

### `cmp.__disable()`

returns: `void`

#### Example

```js
cmp.__disable(); // CMP won't run even if you try
```

### `cmp.__enable()`

returns: `void`

#### Example

```js
cmp.__enable(); // CMP will work as normal
```

### `cmp.__isDisabled()`

returns: `boolean`

#### Example

```js
cmp.__isDisabled(); // => true/false
```

### Manually

Set a `gu-cmp-disabled=true` cookie. This is the same as running `cmp.__disable()`.

#### Example

```js
document.cookie = 'gu-cmp-disabled=true;';
```

Removing it is the same as running `cmp.__enable()`.

#### Example

```js
document.cookie = 'gu-cmp-disabled=; Max-Age=0;';
```

### Using Cypress

To disable consent in Cypress tests, see their [`setCookie` documentation](https://docs.cypress.io/api/commands/setcookie.html).

## Development

See the [developer docs](docs/01-development-instructions.md)
