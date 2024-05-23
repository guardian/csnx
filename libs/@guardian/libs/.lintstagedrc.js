import config from '../../../.lintstagedrc.js';

export default {
	'src/logger/**/*|scripts/generateSvg.logger.subscriptions.*':
		'tsx scripts/generateSvg.logger.subscriptions.ts',
	...config,
};
