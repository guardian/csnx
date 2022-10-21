# `@guardian/core-web-vitals`

[![npm (scoped)](https://img.shields.io/npm/v/@guardian/core-web-vitals)](https://www.npmjs.com/package/@guardian/core-web-vitals)
[![ES version](https://badgen.net/badge/ES/2020/cyan)](https://tc39.es/ecma262/2020/)
[![npm type definitions](https://img.shields.io/npm/types/@guardian/core-web-vitals)](https://www.typescriptlang.org/)
[![Coverage Status](https://coveralls.io/repos/github/guardian/libs/badge.svg)](https://coveralls.io/github/guardian/libs)

## Installation

[![Generic badge](https://img.shields.io/badge/google-chat-259082.svg)](https://chat.google.com/room/AAAAWwBdSMs)

```bash
yarn add @guardian/core-web-vitals
```

or

```bash
npm install @guardian/core-web-vitals
```

then

```js
import { loadScript, storage, ...etc } from '@guardian/core-web-vitals';
```

### TypeScript

If you are using this library with TypeScript, make sure you are using at least TypeScript v<!-- TS_VERSION -->4.8.4<!-- /TS_VERSION -->.

### Bundling

This package uses `ES2020`.

If your target environment does not support that, make sure you transpile this package when bundling your application.
