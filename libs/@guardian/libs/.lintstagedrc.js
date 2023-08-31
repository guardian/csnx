const config = require('../../../.lintstagedrc.js');

module.exports = {
	'src/logger/**/*|scripts/generateSvg.logger.subscriptions.*':
		'node -r @swc-node/register scripts/generateSvg.logger.subscriptions.ts',
	...config,
};
