# getErrorMessage

Returns: `string`

Tries to extract an error message from the argument without throwing a new error, in light of the fact that when you `catch` a value in JavaScript, you don't know what type it has.

## Reference

The current implementation is based on Kent C. Dodd's article, [Get a catch block error message with TypeScript](https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript).

## Example

```js
import { getErrorMessage } from '@guardian/libs';

// Example 1 (handling an Error that's been thrown)
try {
	throw new Error('This is an error message');
} catch (e) {
	console.error(getErrorMessage(e)); // Expected log output: "This is an error message"
}

// Example 2 (handling a different kind of value that's been thrown for some reason)
try {
	throw 2;
} catch (e) {
	console.error(getErrorMessage(e)); // Expected log output: "2"
}
```
