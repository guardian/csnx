// Mock `./src/index` with whatever `package.json` points at in dist.
// This means we can run the unit tests against `dist` instead.
import { jest } from '@jest/globals';

jest.unstable_mockModule('./src/index', () => import('.'));
jest.unstable_mockModule('./src/cmp', () => import('./dist/cmp.js'));
jest.unstable_mockModule('./src/disable', () => import('./dist/disable.js'));
jest.unstable_mockModule(
	'./src/getCurrentFramework',
	() => import('./dist/getCurrentFramework.js'),
);
jest.unstable_mockModule('./src/export', () => import('./dist/export.js'));
