const config = require('../../../.lintstagedrc.js');

module.exports = {
	'src/logger/**/*':
		'node -r @swc-node/register scripts/generateSvg.logger.teams.ts',
	'*': 'node -r @swc-node/register scripts/update-readme.ts',
	...config,
};
