/* eslint-disable import/no-default-export -- that's what jest likes */
export default {
	displayName: '@guardian/newsletter-types',
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
	coverageDirectory: '../../../coverage/libs/@guardian/newsletter-types',
};
