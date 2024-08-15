import cjs from './configs/cjs.js';
import jest from './configs/jest.js';
import recommended from './configs/recommended.js';

// eslint-disable-next-line import/no-default-export -- TODO
export default {
	configs: {
		recommended,
		jest,
		cjs: [
			{
				files: ['**/*.js'],
				...cjs,
			},
		],
	},
};
