import pluginCSS from '@cobalt-ui/plugin-css';
import pluginJS from '@cobalt-ui/plugin-js';

/** @type import('@cobalt-ui/core').Config */
export default {
	tokens: './src/space.tokens.json',
	outDir: './dist/',
	plugins: [pluginCSS(), pluginJS()],
};
