import stylistic from '@stylistic/eslint-plugin';
import cjs from './configs/cjs.js';
import comments from './configs/comments.js';
import esm from './configs/esm.js';
import imports from './configs/imports.js';
import jest from './configs/jest.js';
import react from './configs/react.js';
import storybook from './configs/storybook.js';
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
];

export default {
	configs: {
		cjs: [
			{
				files: ['**/*.{js,cjs,jsx,ts,cts,tsx}'],
				...cjs,
			},
			{
				files: ['**/*.{mjs,mjsx,mts,mtsx}'],
				...esm,
			},
			...sharedConfigs,
		],
		esm: [
			{
				files: ['**/*.{js,mjs,jsx,mjsx,ts,mts,tsx,mtsx}'],
				...esm,
			},
			{
				files: ['**/*.cjs', '**/*.cts'],
				...cjs,
			},
			...sharedConfigs,
		],
		jest,
		storybook,
		react,
	},
};
