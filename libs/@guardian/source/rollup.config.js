import copy from 'rollup-plugin-copy';
import config from '../../../configs/rollup/rollup.config.js';

export default config({
	input: {
		foundations: 'src/foundations/index.ts',
		'react-components': 'src/react-components/index.ts',
	},
	plugins: [
		copy({
			targets: [
				{
					src: 'src/foundations/__generated__/*.{scss,css}',
					dest: 'dist/foundations/__generated__',
				},
			],
		}),
	],
});
