// cribbed from https://github.com/sindresorhus/is-plain-obj

export const isObject = <Value = unknown>(
	value: unknown,
): value is Record<string | number | symbol, Value> => {
	if (Object.prototype.toString.call(value) !== '[object Object]') {
		return false;
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- it's a native method
	const prototype = Object.getPrototypeOf(value);
	return prototype === null || prototype === Object.prototype;
};
