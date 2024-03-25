const sizeToPresetMapping = {
	textSans: {
		xxsmall: 'textSans12',
		xsmall: 'textSans14',
		small: 'textSans15',
		medium: 'textSans17',
		large: 'textSans20',
		xlarge: 'textSans24',
		xxlarge: 'textSans28',
		xxxlarge: 'textSans34',
	},
};

module.exports = function (fileInfo, api) {
	const j = api.jscodeshift;
	const root = j(fileInfo.source);

	Object.entries(sizeToPresetMapping.textSans).forEach(([oldSize, newSize]) => {
		root
			.find(j.CallExpression, {
				callee: {
					object: { name: 'textSans' },
					property: { name: oldSize },
				},
			})
			.forEach((path) => {
				// Construct a new identifier for the newSize
				const newIdentifier = j.identifier(newSize);

				// Replace the old function call with the new identifier
				j(path).replaceWith(newIdentifier);
			});
	});

	return root.toSource({ quote: 'single' });
};
