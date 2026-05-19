import { createDefaultEsmPreset } from 'ts-jest';

const presetConfig = createDefaultEsmPreset();

/** @typedef {import("jest").Config} Config  */
export const config = {
	clearMocks: true,
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	testPathIgnorePatterns: ['/node_modules/', '/.wireit/'],
	transformIgnorePatterns: [
		'node_modules/.pnpm/(?!@guardian|use-local-storage-state)',
	],
	coveragePathIgnorePatterns: ['/__generated__/'],
	...presetConfig,
};
