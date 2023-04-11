const COOKIE_REGEX = /[()<>@,;"\\/[\]?={} \t]/g;

// subset of https://github.com/guzzle/guzzle/pull/1131
/** @type {(name: string) => boolean} */
const isValidCookieValue = (name) => !COOKIE_REGEX.test(name);

/** @type {(name: string, value: string) => boolean} */
export const isValidCookie = (name, value) =>
	isValidCookieValue(name) && isValidCookieValue(value);
