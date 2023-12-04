module.exports = {
	displayName: '@csnx/design-tokens',
	preset: '../../../jest.preset.js',
	testEnvironment: 'node',
	moduleFileExtensions: ['js', 'jsx'],
	coverageDirectory: '../../../coverage/libs/@csnx/design-tokens',
	transform: {
		'^.+\\.[tj]sx?$': 'ts-jest',
	},
};
