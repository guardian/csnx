/** @typedef {typeof ArticleDisplay[keyof typeof ArticleDisplay]} ArticleDisplay */

export const ArticleDisplay =
	/** @type {const} @satisfies {Record<string, number>} */ ({
		Standard: 200,
		Immersive: 201,
		Showcase: 202,
		NumberedList: 203,
	});
