export const getCookieValues = (name: string): string[] => {
	const nameEq = `${name}=`;
	const cookies = document.cookie.split(';');

	return cookies.reduce((acc: string[], cookie: string) => {
		const cookieTrimmed: string = cookie.trim();
		if (cookieTrimmed.startsWith(nameEq)) {
			acc.push(
				cookieTrimmed.substring(nameEq.length, cookieTrimmed.length),
			);
		}

		return acc;
	}, []);
};
