# `getSwitches()`

Returns: `Promise<Record<string, boolean>>`

Supplies the current list of [active switches on theguardian.com](https://frontend.gutools.co.uk/dev/switchboard).

If `window.guardian.config.switches` exists it will return that. Otherwise it fetches them from https://www.theguardian.com/switches.json.

## Example

```js
import { getSwitches } from '@guardian/libs';

getSwitches().then((switches) => {
    if (switches.mySwitch) {
        // do the thing i want
    }
});
```
