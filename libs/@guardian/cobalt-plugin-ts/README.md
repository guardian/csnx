# @guardian/cobalt-plugin-ts

[cobalt-ui](https://github.com/drwpow/cobalt-ui) plugin that generates a JS file containing the tokens plus a [TypeScript declaration file](https://www.typescriptlang.org/docs/handbook/2/type-declarations.html).

It differs from [@cobalt-ui/plugin-js](<[@cobalt-ui/plugin-js](https://cobalt-ui.pages.dev/integrations/js)>) in that it uses the TS compiler generate the `.d.ts` file, and outputs the tokens as [a `const` assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions).

## Usage

Install the plugin:

```sh
npm install --save-dev @guardian/cobalt-plugin-ts
# or
yarn add --dev @guardian/cobalt-plugin-ts
# or
pnpm add --save-dev @guardian/cobalt-plugin-ts
```

### Example

```js
// tokens.config.js
import pluginTS from '@guardian/cobalt-plugin-ts';

export default {
	// ...
	plugins: [
		pluginTS(options),
		// ...
	],
};
```

### `options`

#### `options.filename`

type: `string`

The name of the output JS file. The declaration file will have the same name with `.d.ts` appended.
