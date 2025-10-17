/**
 * Convert camelCase to kebab-case
 * @param {string} str
 */
export const camelToKebab = (str) =>
	str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
