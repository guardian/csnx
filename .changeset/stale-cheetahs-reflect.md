---
'@guardian/libs': minor
---

Relocates the Guardian's CMP from [`@guardian/consent-management-platform`](https://www.npmjs.com/package/@guardian/consent-management-platform) to `@guardian/libs`.

_`@guardian/consent-management-platform` is now deprecated._

## Before

```js
import {
	cmp,
	onConsent,
	onConsentChange,
	getConsentFor,
} from '@guardian/consent-management-platform';
```

## After

```js
import { cmp, onConsent, onConsentChange, getConsentFor } from '@guardian/libs';
```

The new exports are functionally identical to those in the final version of `@guardian/consent-management-platform`: [v13.12.1](https://github.com/guardian/consent-management-platform/releases/tag/v13.12.1).
