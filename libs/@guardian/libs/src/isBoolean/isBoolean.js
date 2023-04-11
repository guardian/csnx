/** @type {(_: unknown) => _ is boolean} */
export const isBoolean = (_) => {
	return typeof _ === 'boolean';
};
