/**
 * @type {import('prettier').Options}
 */
module.exports = {
	arrowParens: 'always',
	bracketSpacing: true,
	bracketSameLine: false,
	jsxSingleQuote: false,
	printWidth: 80,
	quoteProps: 'as-needed',
	semi: true,
	singleQuote: true,
	trailingComma: 'all',

	// Tabs for accessibility reasons:
	// - https://alexandersandberg.com/tabs-for-accessibility
	// - https://twitter.com/Rich_Harris/status/1541761871585464323
	// If it messes up your github previews, you can choose your favourite tab width:
	// - https://github.com/settings/appearance
	useTabs: true,
};
