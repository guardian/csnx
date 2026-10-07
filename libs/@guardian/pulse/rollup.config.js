import config from '../../../configs/rollup/rollup.config.js';
import { inlineCss } from './lib/rollup/inline-css.js';

export default config({
	input: 'src/components/index.ts',
	plugins: [inlineCss()],
});
