# `log`, `debug`

Selectively log subscription-specific messages to the console.

### Example

```js
// my-file.js

import { log } from '@guardian/libs';

log('commercial', { 1: true, 2: false });
```

Then in the browser console, you can do:

```js
window.guardian.logger.subscriptions();
> ['commercial', 'cmp', 'dotcom', ...];

window.guardian.logger.subscribeTo('commercial');
window.guardian.logger.unsubscribeFrom('cmp');
```

and see

![example branded console output](../../static/logger.svg)

## Methods

### `log(subscription, args)`

Returns: `void`

Logs a message to the console for a specific subscription.

#### `subscription`

Type: `string`<br>

Name of the subscription interested in this log.

#### `args`

Type: `any`<br>

The content to `console.log`.

#### Example

```js
log('commercial', { 1: true, 2: false });
```

### `debug(subscription, args)`

Returns: `void`

Identical to [`log`][], but only runs in non-production environments (including CODE).

## Browser globals

### `window.guardian.logger.subscriptions()`

Returns: `Array`

Get a list of available subscriptions.

### `window.guardian.logger.subscribeTo(subscription)`

Returns: `void`

Start receiving logs for a specific subscription.

### `window.guardian.logger.unsubscribeFrom(subscription)`

Returns: `void`

Stop receiving logs for a specific subscription.

[`log`]: #logsubscription-args
[`debug`]: #debugsubscription-args
