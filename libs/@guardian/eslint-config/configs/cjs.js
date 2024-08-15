import globals from 'globals';

// eslint-disable-next-line import/no-default-export -- TODO
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
