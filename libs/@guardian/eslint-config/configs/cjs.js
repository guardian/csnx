import globals from 'globals';

export default {
	languageOptions: {
		globals: {
			...globals.commonjs,
			...globals.node,
		},
		parserOptions: {
			sourceType: 'commonjs',
		},
	},
};
