export const stripHtmlTags = (html: string): string => {
	const doc = new DOMParser().parseFromString(html, 'text/html');
	return doc.body.textContent ?? '';
};
