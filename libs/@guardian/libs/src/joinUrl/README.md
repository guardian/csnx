# `joinUrl`

Returns: `string`

Function that takes a variable number of strings as arguments, joining them as a single valid URL string.

Handles trailing or leading spaces and double slashes.

## Example

```js
import { joinUrl } from '@guardian/libs';

const url = joinUrl('https://example.com/', '/media', '/', '//source.png');
console.assert(url === 'https://example.com/media/source.png');
```
