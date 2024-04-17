import type { Config } from 'jest';

export const config: Config = {
	clearMocks: true,
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	resolver: '@nx/jest/plugins/resolver',
	transformIgnorePatterns: ['node_modules/(?!@guardian)'],
	transform: {
		'^.+\\.[tj]sx?$': [
			'ts-jest',
			{
				tsconfig: '<rootDir>/tsconfig.spec.json',
			},
		],
	},
};
