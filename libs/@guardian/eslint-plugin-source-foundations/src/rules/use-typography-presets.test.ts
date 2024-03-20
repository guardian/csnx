import { RuleTester } from 'eslint';
import { useTypographyPresets } from './use-typography-presets';

const ruleTester = new RuleTester({
	parser: require.resolve('@typescript-eslint/parser'),
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
});

ruleTester.run('use-typography-presets', useTypographyPresets, {
	valid: [
		"import { titlepiece42 } from '@guardian/source-foundations'; const text = titlepiece42;",
		'const text = titlepiece42;',
	],
	invalid: [
		{
			code: "import { titlepiece } from '@guardian/source-foundations'; const text = titlepiece.small();",
			errors: [{ messageId: 'usePreset' }],
			output:
				"import { titlepiece42 } from '@guardian/source-foundations'; const text = titlepiece42;",
		},
	],
});
