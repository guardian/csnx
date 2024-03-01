/* eslint-disable -- this file will break unless the project is built, so let's not worry about it */

// Mock `src/index` with whatever the dist `package.json` points at.
// This means we can run `src/index.test.ts` against `dist` instead.

// @ts-ignore
import * as dist from '../../../dist/libs/@guardian/source-foundations';

// Register our custom Jest matcher.
import './lib/jest-matchers/toBeValidCSS';
import './lib/jest-matchers/toMatchCSS';

jest.mock('./src/index', () => dist);
