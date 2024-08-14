import cjs from './configs/cjs.js';
import recommended from './configs/recommended.js';
import jest from './configs/jest.js';

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
