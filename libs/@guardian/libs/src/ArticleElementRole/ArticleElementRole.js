/** @typedef {typeof ArticleElementRole[keyof typeof ArticleElementRole]} ArticleElementRole */

export const ArticleElementRole =
	/** @type {const} @satisfies {Record<string, number>} */ ({
		Standard: 0,
		Immersive: 1,
		Supporting: 2,
		Showcase: 3,
		Inline: 4,
		Thumbnail: 5,
		HalfWidth: 6,
	});
