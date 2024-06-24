// Mock `src/index` with whatever the dist `package.json` points at.
// This means we can run `src/index.test.ts` against `dist` instead.

// Register our custom Jest matcher.
import './lib/jest-matchers/toBeValidCSS';
import './lib/jest-matchers/toMatchCSS';

import * as foundations from './foundations';
import * as reactComponents from './react-components';

jest.mock('./src/foundations/index', () => foundations);
jest.mock('./src/react-components/index', () => reactComponents);
