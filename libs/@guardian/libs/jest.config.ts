/* eslint-disable import/no-default-export -- that's what jest likes */
export default {
	displayName: '@guardian/libs',
	preset: '../../../jest.preset.js',
	testEnvironment: './jest.testEnvironment.js',
	transform: {
		'^.+\\.[tj]sx?$': [
			'ts-jest',
			{
				tsconfig: '<rootDir>/tsconfig.spec.json',
			},
		],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	coverageDirectory: '../../../coverage/libs/@guardian/libs',
};
