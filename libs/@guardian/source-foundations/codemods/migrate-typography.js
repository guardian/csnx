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

module.exports = function transformer(file, api) {
	const j = api.jscodeshift;

	return j(file.source)
		.find(j.CallExpression, { callee: { object: { name: 'textSans' } } })
		.replaceWith(({ node }) => {
			return j.identifier(
				sizeToPresetMapping.textSans[node.callee.property.name],
			);
		})
		.toSource();
};

// module.exports.parser = 'ts';
