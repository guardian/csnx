import defaultConfig from '../../../configs/rollup/rollup.config.js';

export default defaultConfig({
	input: {
		index: 'src/index.ts',
		getCurrentFramework: 'src/getCurrentFramework.ts',
	},
});
