/* eslint-env jest -- this is a jest setup file */

// Mock `./src/index` with whatever `package.json` points at in dist.
// This means we can run the unit tests against `dist` instead.

const dist = require('../../../dist/libs/@guardian/libs');

jest.mock('./src/index', () => dist);
