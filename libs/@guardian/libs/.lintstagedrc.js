const config = require('../../../.lintstagedrc.js');

module.exports = {
	'src/logger/**/*|scripts/generateSvg.logger.teams.*':
		'node -r @swc-node/register scripts/generateSvg.logger.teams.ts',
	...config,
};
