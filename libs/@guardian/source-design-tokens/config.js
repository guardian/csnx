module.exports = {
	source: ['tokens/**/*.json'],
	platforms: {
		scss: {
			transforms: ['attribute/cti', 'name/cti/kebab', 'color/css', 'size/px'],
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
	},
};
