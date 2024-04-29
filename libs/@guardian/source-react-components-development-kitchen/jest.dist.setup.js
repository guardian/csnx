// Mock `src/index` with whatever the dist `package.json` points at.
// This means we can run `src/index.test.ts` against `dist` instead.

// @ts-ignore
import * as dist from '.';

jest.mock('./src/index', () => dist);
