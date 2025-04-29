/** @typedef {import("jest").Config} Config  */
export const config = {
	clearMocks: true,
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	testPathIgnorePatterns: ['/node_modules/', '/.wireit/'],
	transformIgnorePatterns: [
		'node_modules/.pnpm/(?!@guardian|use-local-storage-state|color-convert|color-name)',
	],
	transform: {
		'^.+\\.[tj]sx?$': ['ts-jest'],
	},
	coveragePathIgnorePatterns: ['/__generated__/'],
};
