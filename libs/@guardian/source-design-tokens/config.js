// Category, Type, Item, Sub-item, State

module.exports = {
	source: ['tokens/**/*.json'],
	platforms: {
		css: {
			transforms: ['attribute/cti', 'name/cti/kebab', 'color/css', 'size/px'],
			// transformGroup: 'css',
			buildPath: 'build/',
			files: [
				{
					filter: (token) =>
						token.attributes.category === 'color' &&
						token.attributes.type !== 'base', // Filter out base colours
					destination: '_palette.css',
					format: 'css/variables',
				},
				{
					filter: (token) =>
						token.attributes.category === 'size' &&
						token.attributes.type === 'space',
					destination: '_space.css',
					format: 'css/variables',
				},
			],
		},
		// js: {
		//   transformGroup: 'js',
		// 	buildPath: 'build/',
		// 	files: [
		// 		{
		// 			filter: (token) =>
		// 				token.attributes.category === 'color' &&
		// 				token.attributes.type !== 'base', // Filter out base colours
		//     	format: 'javascript/es6',
		//       destination: 'colors.js'
		//     }
		//   ]
		// },
		// ios: {
		//   transformGroup: 'ios',
		// 	buildPath: 'build/',
		// 	files: [
		// 		{
		// 			filter: (token) =>
		// 				token.attributes.category === 'color' &&
		// 				token.attributes.type !== 'base', // Filter out base colours
		//     	format: 'ios-swift/enum.swift',
		//       destination: 'colors.swift'
		//     }
		//   ]
		// }
	},
};
