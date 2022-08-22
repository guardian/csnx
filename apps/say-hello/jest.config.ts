/* eslint-disable import/no-default-export -- that's what jest likes */
export default {
	displayName: 'say-hello',
	preset: '../../jest.preset.js',
	transform: {
		'^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
		'^.+\\.[tj]sx?$': [
			'@swc/jest',
			{ jsc: { transform: { react: { runtime: 'automatic' } } } },
		],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	coverageDirectory: '../../coverage/apps/say-hello',
};
