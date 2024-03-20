// scripts/runCodemod.js

import { execSync } from 'child_process';
import * as path from 'node:path';

const codemodName = process.argv[2]; // Get codemod name from command line argument
const targetPath = process.argv[3]; // Get the path to the files to transform

if (!codemodName || !targetPath) {
	console.log('Usage: npm run codemod <codemodName> <pathToFiles>');
	process.exit(1);
}

const codemodPath = path.resolve(__dirname, `../codemods/${codemodName}.js`);

try {
	execSync(`npx jscodeshift -t ${codemodPath} ${targetPath}`, {
		stdio: 'inherit',
	});
	console.log('Codemod applied successfully!');
} catch (error) {
	console.error('Failed to apply codemod:', error);
}
