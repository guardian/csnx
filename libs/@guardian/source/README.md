# `@guardian/source`

<img src="https://github.com/guardian/csnx/blob/main/libs/@guardian/source/assets/logo.png?raw=true" height="320" width="620" >

> An NPM package containing design foundations and robust, accessible React components from the Guardian's
> [Source Design System](https://theguardian.design).

[![npm](https://img.shields.io/npm/v/@guardian/source)](https://www.npmjs.com/package/@guardian/source)
<a href="https://guardian.github.io/storybooks" target="_blank"><img src="https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg"></a>

## Install

```sh
$ pnpm add @guardian/source
```

or

```sh
$ yarn add @guardian/source
```

or

```sh
$ npm install @guardian/source
```

> [!NOTE]
> Use of the React components will require [@emotion/react](https://emotion.sh/docs/introduction#react)

## Usage

_Full documentation is available in the [Source storybook](https://guardian.github.ixo/storybooks)._

### `foundations`

Source design foundations (e.g. colour, spacing, typography etc) can be imported from the `foundations` subpath:

```js
import { palette } from '@guardian/source/foundations`
```

### `react-components`

A set of robust, accessible, React components can be imported from the `react-components` subpath:

```js
import { Button } from '@guardian/source/react-components`
```

## Contributing

We welcome contributions to Source! See our [contributing](../../../docs/source/contributing.md) and [Storybook](../../../docs/source/storybook.md) docs for more info.
