export const isString = (_: unknown): _ is string => {
	return Object.prototype.toString.call(_) === '[object String]';
};
