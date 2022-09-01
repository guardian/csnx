# `loadScript(src, props?)`

Returns: `Promise<Event | undefined>`

Loads an external JavaScript file by injecting a `script` element into the page.

Returns a promise that resolves the `load` event once the script has loaded, or rejects with the `Error` if something goes wrong.

If a script has been loaded already, it will resolve `undefined` immediately.

### `src`

Type: `string`

URL for the script `src`.

### `props?`

Type: `object`

Optional attributes for the `script` element that will be created. Can be any valid `script` attributes other than `src`, `onload` or `onerror`, which will be ignored.

## Example

```js
import { loadScript } from '@guardian/libs';

loadScript('my-polyfills.js', { async: false });

loadScript('my-functions.js')
    .then(() => {
        // do something now that my-functions.js has loaded
    })
    .catch(() => {
        // do something if my-functions.js script fails to load
    });
```
