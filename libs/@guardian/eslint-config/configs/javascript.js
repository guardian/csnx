import { readPackageUp } from 'read-package-up';
import cjs from './javascript.cjs.js';
import esm from './javascript.esm.js';

const isModule = (await readPackageUp()).packageJson.type === 'module';

export default isModule
	? [
			{
				files: ['**/*.{js,mjs,jsx,mjsx,ts,mts,tsx,mtsx}'],
				...esm,
			},
			{
				files: ['**/*.cjs', '**/*.cts'],
				...cjs,
			},
		]
	: [
			{
				files: ['**/*.{js,cjs,jsx,ts,cts,tsx}'],
				...cjs,
			},
			{
				files: ['**/*.{mjs,mjsx,mts,mtsx}'],
				...esm,
			},
		];
