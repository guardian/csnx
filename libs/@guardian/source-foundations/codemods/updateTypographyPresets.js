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
	headline: {
		medium: 'HeadlineMedium34',
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
	const usedPresets = new Set();
	root.find(j.TaggedTemplateExpression).forEach((templatePath) => {
		templatePath.node.quasi.expressions.forEach((expr, index) => {
			if (
				!(expr.type === 'CallExpression') ||
				!expr.callee.object ||
				expr.callee.object.name !== 'textSans' ||
				sizeToPresetMapping.textSans[expr.callee.property.name]
			) {
				return;
			}

			const newSize = sizeToPresetMapping.textSans[expr.callee.property.name];
			usedPresets.add(newSize);
			if (expr.arguments.length === 0) return;

			const optionsArg = expr.arguments[0];

			// Proceed only if the argument is an object expression
			if (optionsArg.type !== 'ObjectExpression') return;

			// Try to find the lineHeight property
			const lineHeightProp = optionsArg.properties.find(
				(prop) => prop.key.name === 'lineHeight',
			);
			if (!lineHeightProp) return;

			// Assuming the value is a string literal, retrieve the key for lineHeight
			const lineHeightKey = lineHeightProp.value.value;
			const lineHeightValue = lineHeightMapping[lineHeightKey];
			if (!lineHeightValue) return;

			// Locate the next template literal segment to insert the comment
			const nextQuasi = templatePath.node.quasi.quasis[index + 1];
			if (!nextQuasi) return;

			// Construct and insert the comment about lineHeight
			const commentLine = `;
/** @todo consider not overriding lineHeights */
line-height: ${lineHeightValue};`;

			nextQuasi.value.raw = commentLine + nextQuasi.value.raw;
			nextQuasi.value.cooked = commentLine + nextQuasi.value.cooked;
		});
	});
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
				// Replace the function call with the preset identifier
				const newIdentifier = j.identifier(newSize);
				j(path).replaceWith(newIdentifier);
				usedPresets.add(newSize);
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
