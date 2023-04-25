module.exports = {
	displayName: '@guardian/tsconfig',
	preset: '../../../jest.preset.js',
	testEnvironment: 'node',
	moduleFileExtensions: ['js', 'jsx'],
	coverageDirectory: '../../../coverage/libs/@guardian/tsconfig',
	transform: {
		'^.+\\.[tj]sx?$': 'ts-jest',
	},
};
