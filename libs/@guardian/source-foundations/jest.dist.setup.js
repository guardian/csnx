// Mock `src/index` with whatever the dist `package.json` points at.
// This means we can run `src/index.test.ts` against `dist` instead.

import * as dist from '.';

// Register our custom Jest matcher.
import './lib/jest-matchers/toBeValidCSS';
import './lib/jest-matchers/toMatchCSS';

jest.mock('./src/index', () => dist);
