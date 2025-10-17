/** @param {string} fontSize */
export const textDecorationThickness = (fontSize) => {
	switch (fontSize) {
		case '20px':
		case '24px':
		case '28px':
			return '3px';
		case '34px':
			return '4px';
		case '42px':
			return '5px';
		case '50px':
		case '64px':
		case '70px':
			return '6px';
		default:
			return '2px';
	}
};
