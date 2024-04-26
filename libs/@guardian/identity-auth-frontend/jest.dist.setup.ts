/* eslint-disable -- this file will break unless the project is built, so let's not worry about it */

// Mock `./src/index` with whatever `package.json` points at in dist.
// This means we can run the unit tests against `dist` instead.

import * as dist from '../../../dist/libs/@guardian/identity-auth-frontend';

jest.mock('./src/index', () => dist);
