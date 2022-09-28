/* eslint-disable import/no-default-export -- that's what jest likes */
export default {
	displayName: '@guardian/source-react-components-development-kitchen',
	preset: '../../../jest.preset.js',
	testEnvironment: 'node',
	transform: {
		'^.+\\.[tj]sx?$': [
			'ts-jest',
			{
				tsconfig: '<rootDir>/tsconfig.spec.json',
			},
		],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	coverageDirectory:
		'../../../coverage/libs/@guardian/source-react-components-development-kitchen',
};
