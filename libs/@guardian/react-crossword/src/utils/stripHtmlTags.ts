const regex = /<\/?(span|i|b|sup|sub)[^>]*?>/g;
export const stripHtmlTags = (html: string): string => {
	// Remove the allowed tags for a clue: span, i, b, sup, sub
	// Reference: https://crossword.info/docs/schema-doc.html#h464208646
	// On the server, there is no DOMParser, so we have to use regex or install a html parsing library.
	// As we know the tags that are allowed, regex is sufficient.
	return html.replace(regex, '');
};
