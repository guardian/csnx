const COOKIE_REGEX = /[()<>@,;"\\/[\]?={} \t]/g;

// subset of https://github.com/guzzle/guzzle/pull/1131
const isValidCookieValue = (name: string) => !COOKIE_REGEX.test(name);

export const isValidCookie = (name: string, value: string): boolean =>
	isValidCookieValue(name) && isValidCookieValue(value);
