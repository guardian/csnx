// Mock `src/index` with whatever dist `package.json` points at.
// This means we can run `src/index.test.ts` against `dist` instead.

import * as dist from '../../../dist/libs/@guardian/source-foundations';

jest.mock('./src/index', () => dist);
