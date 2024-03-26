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

const lineHeightMapping = {
	tight: '1.15',
	regular: '1.3',
	loose: '1.4',
};
module.exports = function (fileInfo, api) {
	const j = api.jscodeshift;
	const root = j(fileInfo.source);

	// Track which new presets we've actually used
	const usedPresets = new Set();

	// Transform textSans.size() calls to new preset identifiers
	Object.entries(sizeToPresetMapping.textSans).forEach(([oldSize, newSize]) => {
		root
			.find(j.CallExpression, {
				callee: {
					object: { name: 'textSans' },
					property: { name: oldSize },
				},
			})
			.forEach((path) => {
				if (path.node.arguments.length >= 1) {
					console.log(path.node.arguments[0].properties);
					const optionsArg = path.node.arguments[0];
					if (optionsArg.type === 'ObjectExpression') {
						const lineHeightProp = optionsArg.properties.find(
							(prop) => prop.key.name === 'lineHeight',
						);
						console.log(lineHeightProp);
						if (
							lineHeightProp &&
							lineHeightMapping[lineHeightProp.value.value]
						) {
							console.log('here OATA');
							// Found a lineHeight argument, insert the comment and CSS line
							const cssValue = lineHeightMapping[lineHeightProp.value.value];
							const comment = j.commentLine(
								' @todo consider not overriding lineHeights ',
							);
							const cssLine = j.expressionStatement(
								j.templateLiteral(
									[
										j.templateElement(
											{
												raw: `line-height: ${cssValue};`,
												cooked: `line-height: ${cssValue};`,
											},
											true,
										),
									],
									[],
								),
							);

							// Add the comment and CSS line after the current path
							j(path).insertAfter(comment);
							j(path).insertAfter(cssLine);
						}
					}
					const newIdentifier = j.identifier(newSize);
					j(path).replaceWith(newIdentifier);
					usedPresets.add(newSize);
				} else if (path.node.arguments.length === 0) {
					const newIdentifier = j.identifier(newSize);
					j(path).replaceWith(newIdentifier);
					usedPresets.add(newSize);
				}
			});
	});

	// Find the @guardian/source-foundations import declaration
	const importDeclaration = root.find(j.ImportDeclaration, {
		source: { value: '@guardian/source-foundations' },
	});

	// After all transformations, check if 'textSans' is still used anywhere in the file
	// Conduct a precise check for `textSans` function calls
	const isTextSansCalled =
		root
			.find(j.CallExpression, {
				callee: {
					object: { name: 'textSans' },
				},
			})
			.size() > 0;
	// If 'textSans' is no longer used, remove it from the import declaration
	if (!isTextSansCalled) {
		root
			.find(j.ImportDeclaration, {
				source: { value: '@guardian/source-foundations' },
			})
			.forEach((path) => {
				// Keep all specifiers except 'textSans'
				const newSpecifiers = path.node.specifiers.filter(
					(specifier) => specifier.imported.name !== 'textSans',
				);

				if (newSpecifiers.length > 0) {
					// If there are other specifiers left, update the import declaration
					path.node.specifiers = newSpecifiers;
				} else {
					// If no specifiers left, remove the whole import declaration
					j(path).remove();
				}
			});
	}
	// Add missing preset imports
	usedPresets.forEach((preset) => {
		if (
			importDeclaration
				.find(j.ImportSpecifier, { imported: { name: preset } })
				.size() === 0
		) {
			importDeclaration
				.get(0)
				.node.specifiers.push(j.importSpecifier(j.identifier(preset)));
		}
	});

	return root.toSource({ quote: 'single' });
};
