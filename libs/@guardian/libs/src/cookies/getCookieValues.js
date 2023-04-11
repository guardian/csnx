/** @type {(name: string) => string[]} */
export const getCookieValues = (name) => {
	const nameEq = `${name}=`;
	const cookies = document.cookie.split(';');

	return cookies.reduce((acc, cookie) => {
		const cookieTrimmed = cookie.trim();
		if (cookieTrimmed.startsWith(nameEq)) {
			acc.push(cookieTrimmed.substring(nameEq.length, cookieTrimmed.length));
		}

		return acc;
	}, /** @type {string[]} */ ([]));
};
