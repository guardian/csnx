/** @typedef {import("jest").Config} Config  */
export const config = {
	clearMocks: true,
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

	transformIgnorePatterns: ['node_modules/(?!@guardian)'],
	transform: {
		'^.+\\.[tj]sx?$': [
			'ts-jest',
			{
				tsconfig: '<rootDir>/tsconfig.spec.json',
			},
		],
	},
};
