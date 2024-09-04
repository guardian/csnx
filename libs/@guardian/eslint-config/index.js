import comments from './configs/comments.js';
import imports from './configs/imports.js';
import cjs from './configs/javascript.cjs.js';
import esm from './configs/javascript.esm.js';
import javascript from './configs/javascript.js';
import jest from './configs/jest.js';
import react from './configs/react.js';
import recommended from './configs/recommended.js';
import storybook from './configs/storybook.js';
import typescript from './configs/typescript.js';

export default {
	configs: {
		recommended,
		javascript,
		cjs,
		esm,
		typescript,
		imports,
		comments,
		jest,
		storybook,
		react,
	},
};
