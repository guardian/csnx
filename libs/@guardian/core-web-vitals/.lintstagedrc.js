const config = require('../../../.lintstagedrc.js');

module.exports = {
	'*': 'node -r @swc-node/register scripts/update-readme.ts',
	...config,
};
