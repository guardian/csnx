# `@guardian/eslint-config`

> ESLint configs for Guardian JavaScript and TypeScript projects.

## Installation

```bash
npm install --save-dev @guardian/eslint-config

# or
yarn add --dev @guardian/eslint-config

# or
pnpm install --save-dev @guardian/eslint-config
```

## Usage

#### Example

```js
// eslint.config.js

import guardian from '@guardian/eslint-config';

export default [...guardian.configs.recommended];
```

### Configs

The package's default export is an object with a `configs` property that provides configs for different projects.

Some of them are single-purpose, and others compose the single-purpose configs into useful presets.

#### [`configs.recommended`](./configs/recommended.js)

Provides a recommended collection of useful configs covering both JavaScript and TypeScript.

Composes:

- `configs.javascript`
- `configs.typescript`
- `configs.imports`
- `configs.comments`

#### [`configs.javascript`](./configs/javascript.js)

_Included in `configs.recommended`._

Provides a collection of configs for checking JavaScript, which are also applied to TypeScript files.

It automatically detects your project type (using `package.json#type`), and uses an appropriate config for each file.

Composes:

- `configs.esm`
- `configs.cjs`

#### [`configs.esm`](./configs/esm.js)

_Included in `configs.javascript`._

Provides a collection of configs for ECMAScript modules.

It assumes everything will be ECMAScript, and will error if you use it on a CommonJS module.

#### [`configs.cjs`](./configs/cjs.js)

_Included in `configs.javascript`._

Provides a collection of configs for CommonJS modules.

It assumes everything will be CommonJS, and will error if you use it on an ECMAScript module.

#### [`configs.typescript`](./configs/typescript.js)

_Included in `configs.recommended`._

Provides a collection of configs for checking TypeScript.

#### [`configs.imports`](./configs/imports.js)

_Included in `configs.recommended`._

Provides a collection of configs ensuring best practice around module imports and exports.

#### [`configs.comments`](./configs/comments.js)

_Included in `configs.recommended`._

Provides a collection of configs ensuring best practice around code comments.

#### [`configs.jest`](./configs/jest.js)

Provides a collection of configs for checking Jest units tests.

```js
// eslint.config.js

import guardian from '@guardian/eslint-config';

export default [...guardian.configs.recommended, ...guardian.configs.jest];
```

#### [`configs.react`](./configs/react.js)

Provides a collection of configs for checking React components.

```js
// eslint.config.js

import guardian from '@guardian/eslint-config';

export default [...guardian.configs.recommended, ...guardian.configs.react];
```

#### [`configs.storybook`](./configs/storybook.js)

Provides a collection of configs for checking Storybook stories.

```js
// eslint.config.js

import guardian from '@guardian/eslint-config';

export default [...guardian.configs.recommended, ...guardian.configs.storybook];
```
