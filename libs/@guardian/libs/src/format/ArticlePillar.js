/** @typedef {typeof ArticlePillar[keyof typeof ArticlePillar]} ArticlePillar */

export const ArticlePillar =
	/** @type {const} @satisfies {Record<string, number>} */ ({
		News: 0,
		Opinion: 1,
		Sport: 2,
		Culture: 3,
		Lifestyle: 4,
	});
