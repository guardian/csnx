import config from '../../../configs/rollup/rollup.config.js';

export default config({
	input: {
		foundations: 'src/foundations/index.ts',
		'react-components': 'src/react-components/index.ts',
	},
});
