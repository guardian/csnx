module.exports = {
	displayName: '@guardian/design-tokens',
	preset: '../../../jest.preset.js',
	testEnvironment: 'node',
	moduleFileExtensions: ['js', 'jsx'],
	coverageDirectory: '../../../coverage/libs/@guardian/design-tokens',
	transform: {
		'^.+\\.[tj]sx?$': 'ts-jest',
	},
};
