module.exports = {
	displayName: '@guardian/prettier',
	preset: '../../../jest.preset.js',
	testEnvironment: 'node',
	moduleFileExtensions: ['js', 'jsx'],
	coverageDirectory: '../../../coverage/libs/@guardian/prettier',
	transform: {
		'^.+\\.[tj]sx?$': 'ts-jest',
	},
};
