# `isObject(value)`

Returns: `boolean`

Checks whether `value` is a plain object (i.e. `{}`-like).

## Example

```js
import { isObject } from '@guardian/libs';

isObject({ a: 'a' }); // true
isObject(['a']); // false
```
