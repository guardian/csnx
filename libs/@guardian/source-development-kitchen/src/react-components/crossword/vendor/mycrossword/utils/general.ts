// @ts-nocheck

export const DEFAULT_HTML_TAGS = ['b', 'strong', 'i', 'em', 'sub', 'sup'];
export const DEFAULT_CELL_MATCHER = /[A-Z]/;

export function isValidChar(char: string, matcher: RegExp) {
	if (char.length !== 1) {
		return false;
	}

	return char.match(matcher);
}

export function isInViewport(rect: DOMRect) {
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth) &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
	);
}

export function isInPerimeterRect(rect: DOMRect, perimeterRect: DOMRect) {
	return (
		rect.top >= perimeterRect.top &&
		rect.left >= perimeterRect.left &&
		rect.right <= perimeterRect.right &&
		rect.bottom <= perimeterRect.bottom
	);
}

export function decodeHtmlEntities(html: string) {
	const textArea = document.createElement('textarea');
	textArea.innerHTML = html;
	return textArea.value;
}
