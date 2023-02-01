# `@guardian/libs`

[![npm (scoped)](https://img.shields.io/npm/v/@guardian/libs)](https://www.npmjs.com/package/@guardian/libs)
[![ES version](https://badgen.net/badge/ES/2020/cyan)](https://tc39.es/ecma262/2020/)
[![npm type definitions](https://img.shields.io/npm/types/@guardian/libs)](https://www.typescriptlang.org/)

> A collection of JavaScript libraries and TypeScript types for Guardian projects

### [`ArticleElementRole`](./src/ArticleElementRole)

Type that describes the role of an element in an article.

### [Cookies](./src/cookies)

API over `document.cookies`.

### [Countries](./src/countries)

Country data and methods to access it.

### [Format](./src/format)

Codified editorial design and information architecture.

### [Locale](./src/getLocale)

Get the user’s current location.

### [Switches](./src/getSwitches)

Get the active switches on theguardian.com.

### [`isBoolean`](./src/isBoolean)

Check whether a value is a boolean.

### [`isNonNullable`](./src/isNonNullable)

Check whether a value is a [`NonNullable`](https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype).

### [`isObject`](./src/isObject)

Checks whether a value is a plain object (i.e. `{}`-like).

### [`isString`](./src/isString)

Check whether a value is a string.

### [`isUndefined`](./src/isUndefined)

Check whether a value is `undefined`.

### [`joinUrl`](./src/joinUrl)

Combines separate url parts into one valid url string.

### [`loadScript`](./src/loadScript)

Inject an external JavaScript file.

### [`log`, `debug`](./src/logger)

Selectively log team-specific messages to the console.

### [Ophan](./src/@types/ophan)

Types relating to Ophan.

### [`storage`](./src/storage)

Robust API over `localStorage` and `sessionStorage`.

### [`timeAgo`](./src/timeAgo)

Format absolute dates as time-ago strings.

## Installation

[![Generic badge](https://img.shields.io/badge/google-chat-259082.svg)](https://chat.google.com/room/AAAAWwBdSMs)

```bash
yarn add @guardian/libs
```

or

```bash
npm install @guardian/libs
```

then

```js
import { loadScript, storage, ...etc } from '@guardian/libs';
```

### Bundling

This package uses `ES2020`.

If your target environment does not support that, make sure you transpile this package when bundling your application.
