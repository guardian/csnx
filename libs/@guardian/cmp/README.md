# `@guardian/cmp`

The Guardian's consent management platform.

[![npm (scoped)](https://img.shields.io/npm/v/@guardian/cmp)](https://www.npmjs.com/package/@guardian/cmp)
[![ES version](https://badgen.net/badge/ES/2020/cyan)](https://tc39.es/ecma262/2020/)
[![npm type definitions](https://img.shields.io/npm/types/@guardian/cmp)](https://www.typescriptlang.org/)

>

## Installation

[![Generic badge](https://img.shields.io/badge/google-chat-259082.svg)](https://chat.google.com/room/AAAAFdv9gK8)

```bash
yarn add @guardian/cmp
```

or

```bash
npm install @guardian/cmp
```

then

```js
import { getConsentFor, ...etc } from '@guardian/cmp';
```

### Bundling

This package uses `ES2020`.

If your target environment does not support that, make sure you transpile this package when bundling your application.

### Local Testing Using Linking

1. In the command line in your terminal, navigate to the csnx root directory. Run:

```sh
make @guardian/cmp:build
```

This build command has to be re-run for changes to be picked up.

2. Navigate to the repo that will test your code changes. In the appropriate folder of that repo, run

```sh
npm/yarn/pnpm link ../csnx/libs/@guardian/cmp
```

where '../csnx' is the path to your local changes in csnx where you cloned the csnx code to.

After re-building the '@guardian/cmp' in step 1. this command does not have to be repeated and changes will be automatically picked up.

3. Once you’ve developed your changes and tested, you can unlink from the repo where you are testing the changes

```sh
npm/yarn/pnpm unlink ../csnx/libs/@guardian/cmp
```
