import config from '../../../configs/rollup/rollup.config.js';

export default config({
	input: 'src/index.ts',
	externalsOptions: { exclude: 'use-local-storage-state' },
	cjsOutputOptions: { exports: 'named' },
});
