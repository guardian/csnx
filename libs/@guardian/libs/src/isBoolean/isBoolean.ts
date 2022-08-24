export const isBoolean = (_: unknown): _ is boolean => {
	return typeof _ === 'boolean';
};
