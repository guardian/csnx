import globals from 'globals';

export default [
	{
		name: '@guardian/jest',
		files: ['**/*.test.{js,mjs,cjs,jsx,mjsx,ts,mts,cts,tsx,mtsx}'],
		languageOptions: {
			globals: {
				...globals.jest,
			},
		},
	},
];
