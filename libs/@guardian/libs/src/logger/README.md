# `log`, `debug`

Selectively log team-specific messages to the console.

### Example

```js
// my-file.js

import { log } from '@guardian/libs';

log('commercial', { 1: true, 2: false });
```

Then in the browser console, you can do:

```js
window.guardian.logger.teams();
> ['commercial', 'cmp', 'dotcom'];

window.guardian.logger.subscribeTo('commercial');
window.guardian.logger.unsubscribeFrom('cmp');
```

and see

![example branded console output](/static/logger.svg)

## Table of contents

-   [Methods](#methods)
    -   [`log(team, args)`](#logteam-args)
    -   [`debug(team, args)`](#debugteam-args)
-   [Browser globals](#browser-globals)
    -   [`window.guardian.logger.subscribeTo(team)`](#windowguardianloggersubscribetoteam)
    -   [`window.guardian.logger.unsubscribeFrom(team)`](#windowguardianloggerunsubscribefromteam)
    -   [`window.guardian.logger.teams()`](#windowguardianloggerteams)

## Methods

### `log(team, args)`

Returns: `void`

Logs a message to the console for a specific team.

#### `team`

Type: `string`<br>

Name of the team interested in this log.

#### `args`

Type: `any`<br>

The content to `console.log`.

#### Example

```js
log('commercial', { 1: true, 2: false });
```

### `debug(team, args)`

Returns: `void`

Identical to [`log`][], but only runs in non-production environments (including CODE).

## Browser globals

### `window.guardian.logger.teams()`

Returns: `Array`

Get a list of available teams.

### `window.guardian.logger.subscribeTo(team)`

Returns: `void`

Start receiving logs for a specific team.

### `window.guardian.logger.unsubscribeFrom(team)`

Returns: `void`

Stop receiving logs for a specific team.

[`log`]: #logteam-args
[`debug`]: #debugteam-args
