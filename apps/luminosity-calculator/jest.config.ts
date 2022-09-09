/* eslint-disable import/no-default-export -- that's what jest likes */
export default {
	displayName: '@guardian/luminosity-calculator',
	preset: '../../jest.preset.js',
	transform: {
		'^.+\\.[tj]s$': 'babel-jest',
	},
	moduleFileExtensions: ['ts', 'js', 'html'],
	coverageDirectory: '../../coverage/apps/luminosity-calculator',
};
