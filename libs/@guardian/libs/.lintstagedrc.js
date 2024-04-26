import config from '../../../.lintstagedrc.js';

export default {
	'src/logger/**/*|scripts/generateSvg.logger.subscriptions.*':
		'node -r @swc-node/register scripts/generateSvg.logger.subscriptions.ts',
	...config,
};
