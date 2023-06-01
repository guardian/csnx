module.exports = {
	displayName: '@guardian/source-design-tokens',
	preset: '../../../jest.preset.js',
	testEnvironment: 'node',
	moduleFileExtensions: ['js', 'jsx'],
	coverageDirectory: '../../../coverage/libs/@guardian/source-design-tokens',
	transform: {
		'^.+\\.[tj]sx?$': 'ts-jest',
	},
};
