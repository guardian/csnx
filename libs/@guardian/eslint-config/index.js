import stylistic from '@stylistic/eslint-plugin';
import cjs from './configs/cjs.js';
import comments from './configs/comments.js';
import esm from './configs/esm.js';
import imports from './configs/imports.js';
import typescript from './configs/typescript.js';

const sharedConfigs = [
	{
		linterOptions: {
			reportUnusedDisableDirectives: 'error',
		},
	},
	...imports,
	...typescript,
	comments,
	{
		plugins: {
			'@stylistic': stylistic,
		},
		rules: {
			// delimit members with semi-colons and require
			// one at the end to keep diffs simpler
			'@stylistic/member-delimiter-style': [
				2,
				{
					multiline: {
						delimiter: 'semi',
						requireLast: true,
					},
					singleline: {
						delimiter: 'semi',
						requireLast: false,
					},
				},
			],
		},
	},
	// storybook: {
	// 	files: [
	// 		'**/*.stories.js',
	// 		'**/*.stories.jsx',
	// 		'**/*.stories.ts',
	// 		'**/*.stories.tsx',
	// 		'**/*.stories.mjs',
	// 		'**/*.stories.cjs',
	// 		'**/*.stories.mdx',
	// 	],
	// 	rules: {},
	// },
	// jest: {
	// 	files: [
	// 		'**/*.test.js',
	// 		'**/*.test.ts',
	// 		'**/*.test.jsx',
	// 		'**/*.test.tsx',
	// 		'**/*.test.mjs',
	// 		'**/*.test.cjs',
	// 	],
	// 	rules: {},
	// },
];

export default {
	configs: {
		cjs: [
			{
				files: [
					'**/*.js',
					'**/*.ts',
					'**/*.cjs',
					'**/*.cts',
					'**/*.jsx',
					'**/*.tsx',
				],
				...cjs,
			},
			{
				files: ['**/*.mjs', '**/*.mts'],
				...esm,
			},
			...sharedConfigs,
		],
		esm: [
			{
				files: [
					'**/*.js',
					'**/*.ts',
					'**/*.mjs',
					'**/*.mts',
					'**/*.jsx',
					'**/*.tsx',
				],
				...esm,
			},
			{
				files: ['**/*.cjs', '**/*.cts'],
				...cjs,
			},
			...sharedConfigs,
		],
	},
};
