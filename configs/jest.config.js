/** @typedef {import("jest").Config} Config  */
export const config = {
	clearMocks: true,
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	testPathIgnorePatterns: ['/node_modules/', '/.wireit/'],
	transformIgnorePatterns: ['node_modules/.pnpm/(?!@guardian)'],
	transform: {
		'^.+\\.[tj]sx?$': ['ts-jest'],
	},
};
