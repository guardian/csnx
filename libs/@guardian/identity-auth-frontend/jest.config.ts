/* eslint-disable import/no-default-export -- that's what jest likes */
export default {
	displayName: '@guardian/identity-auth-frontend',
	preset: '../../../jest.preset.js',
	testEnvironment: 'jest-environment-jsdom',
	moduleFileExtensions: ['ts', 'js'],
	coverageDirectory: '../../../coverage/libs/@guardian/identity-auth-frontend',
};
