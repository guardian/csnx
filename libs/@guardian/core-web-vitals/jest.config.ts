/* eslint-disable import/no-default-export -- that's what jest likes */
export default {
	displayName: '@guardian/core-web-vitals',
	preset: '../../../jest.preset.js',
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.[tj]sx?$': [
			'ts-jest',
			{
				tsconfig: '<rootDir>/tsconfig.spec.json',
			},
		],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	coverageDirectory: '../../../coverage/libs/@guardian/core-web-vitals',
};
