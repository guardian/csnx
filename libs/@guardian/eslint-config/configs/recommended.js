import comments from './comments.js';
import imports from './imports.js';
import javascript from './javascript.js';
import typescript from './typescript.js';

export default [
	...javascript,
	...imports,
	...typescript, // needs to come after `imports`
	...comments,
	{
		linterOptions: {
			reportUnusedDisableDirectives: 'error',
		},
	},
];
