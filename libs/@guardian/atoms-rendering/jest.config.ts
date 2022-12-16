export default {
	displayName: '@guardian/atoms-rendering',
	preset: '../../../jest.preset.js',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.[tj]sx?$': [
			'ts-jest',
			{
				tsconfig: '<rootDir>/tsconfig.spec.json',
			},
		],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	coverageDirectory: '../../../coverage/libs/@guardian/atoms-rendering',
};
