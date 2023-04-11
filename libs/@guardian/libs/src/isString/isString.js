/** @type {(_: unknown) => _ is string} */
export const isString = (_) => {
	return Object.prototype.toString.call(_) === '[object String]';
};
