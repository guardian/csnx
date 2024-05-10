import { resolve } from 'node:path';
import alias from '@rollup/plugin-alias';
import config from '../../../configs/rollup.config.js';

export default config({
	input: {
		foundations: 'src/foundations/index.ts',
		'react-components': 'src/react-components/index.ts',
	},
	// only needed while we're using symlinks
	plugins: [
		alias({
			entries: [
				{
					find: '@guardian/source-foundations',
					replacement: resolve('./src/foundations/index.ts'),
				},
				{
					find: '@guardian/source-react-components',
					replacement: resolve('./src/react-components/index.ts'),
				},
			],
		}),
	],
});
