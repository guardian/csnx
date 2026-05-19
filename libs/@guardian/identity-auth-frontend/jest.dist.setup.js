// Mock `./src/index` with whatever `package.json` points at in dist.
// This means we can run the unit tests against `dist` instead.
import { jest } from '@jest/globals';
import * as dist from '.';

jest.mock('./src/index', () => dist);
