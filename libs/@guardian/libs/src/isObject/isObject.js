/**
 * cribbed from https://github.com/sindresorhus/is-plain-obj
 * @type {(value: unknown) => value is Record<string | number | symbol, unknown>}
 */
export const isObject = (value) => {
	if (Object.prototype.toString.call(value) !== '[object Object]') {
		return false;
	}

	const prototype = Object.getPrototypeOf(value);
	return prototype === null || prototype === Object.prototype;
};
