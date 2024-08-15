import globals from 'globals';

// eslint-disable-next-line import/no-default-export -- TODO
export default [
	{
		files: [
			'**/*.test.?(c|m)js',
			'**/*.spec.?(c|m)js',
			'**/__tests__/**',
			'**/jest.*.?(c|m)js',
		],
		languageOptions: {
			globals: {
				...globals.jest,
			},
		},
	},
];
