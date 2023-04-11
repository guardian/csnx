/** @typedef {typeof ArticleSpecial[keyof typeof ArticleSpecial]} ArticleSpecial */

export const ArticleSpecial =
	/** @type {const} @satisfies {Record<string, number>} */ ({
		SpecialReport: 5,
		Labs: 6,
		SpecialReportAlt: 7,
	});
