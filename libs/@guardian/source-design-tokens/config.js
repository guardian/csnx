module.exports = {
	source: ['tokens/**/*.json'],
	platforms: {
		scss: {
			transformGroup: 'css',
			buildPath: 'build/css/',
			files: [
				{
					destination: '_variables.css',
					format: 'css/variables',
				},
			],
		},
	},
};
