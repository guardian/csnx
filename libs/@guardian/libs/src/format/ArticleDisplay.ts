const ArticleDisplays = [
	'DisplayStandard',
	'DisplayImmersive',
	'DisplayShowcase',
	'DisplayNumberedList',
] as const;

type ArticleDisplay = typeof ArticleDisplays[number];

export type { ArticleDisplay };
