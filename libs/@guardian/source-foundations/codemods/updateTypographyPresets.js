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
		xxxsmall: 'headlineMedium17',
		xxsmall: 'headlineMedium20',
		xsmall: 'headlineMedium24',
		small: 'headlineMedium28',
		medium: 'headlineMedium34',
		large: 'headlineMedium42',
		xlarge: 'headlineMedium50',
	},
	titlePiece: {
		small: 'titlepiece42',
		medium: 'titlepiece50',
		large: 'titlepiece70',
	},
	body: {
		xsmall: 'textEgyptian14',
		small: 'textEgyptian15',
		medium: 'textEgyptian17',
	},
};
const existingpresets = [
	'headlineBold17',
	'headlineBold20',
	'headlineBold24',
	'headlineBold28',
	'headlineBold34',
	'headlineBold42',
	'headlineBold50',
	'headlineLight17',
	'headlineLight20',
	'headlineLight24',
	'headlineLight28',
	'headlineLight34',
	'headlineLight42',
	'headlineLight50',
	'headlineLightItalic17',
	'headlineLightItalic20',
	'headlineLightItalic24',
	'headlineLightItalic28',
	'headlineLightItalic34',
	'headlineLightItalic42',
	'headlineLightItalic50',
	'headlineMedium17',
	'headlineMedium20',
	'headlineMedium24',
	'headlineMedium28',
	'headlineMedium34',
	'headlineMedium42',
	'headlineMedium50',
	'headlineMediumItalic17',
	'headlineMediumItalic20',
	'headlineMediumItalic24',
	'headlineMediumItalic28',
	'headlineMediumItalic34',
	'headlineMediumItalic42',
	'headlineMediumItalic50',
	'textEgyptian14',
	'textEgyptian15',
	'textEgyptian17',
	'textEgyptianBold14',
	'textEgyptianBold15',
	'textEgyptianBold17',
	'textEgyptianBoldItalic14',
	'textEgyptianBoldItalic15',
	'textEgyptianBoldItalic17',
	'textEgyptianItalic14',
	'textEgyptianItalic15',
	'textEgyptianItalic17',
	'textSans12',
	'textSans14',
	'textSans15',
	'textSans17',
	'textSans20',
	'textSans24',
	'textSans28',
	'textSans34',
	'textSansBold12',
	'textSansBold14',
	'textSansBold15',
	'textSansBold17',
	'textSansBold20',
	'textSansBold24',
	'textSansBold28',
	'textSansBold34',
	'textSansItalic12',
	'textSansItalic14',
	'textSansItalic15',
	'textSansItalic17',
	'textSansItalic20',
	'textSansItalic24',
	'textSansItalic28',
	'textSansItalic34',
	'titlepiece42',
	'titlepiece50',
	'titlepiece70',
];

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
				expr.type === 'CallExpression' &&
				expr.callee.object &&
				sizeToPresetMapping[expr.callee.object.name] &&
				sizeToPresetMapping[expr.callee.object.name][expr.callee.property.name]
			) {
				const newSize =
					sizeToPresetMapping[expr.callee.object.name][
						expr.callee.property.name
					];
				usedPresets.add(newSize);

				if (expr.arguments.length === 0) return;

				const optionsArg = expr.arguments[0];
				if (optionsArg.type !== 'ObjectExpression') return;

				const lineHeightProp = optionsArg.properties.find(
					(prop) => prop.key.name === 'lineHeight',
				);
				if (!lineHeightProp) return;

				const lineHeightKey = lineHeightProp.value.value;
				const lineHeightValue = lineHeightMapping[lineHeightKey];
				if (!lineHeightValue) return;

				const nextQuasi = templatePath.node.quasi.quasis[index + 1];
				if (!nextQuasi) return;

				const commentLine = `;
/** @todo consider not overriding lineHeights */
line-height: ${lineHeightValue};`;

				nextQuasi.value.raw = commentLine + nextQuasi.value.raw;
				nextQuasi.value.cooked = commentLine + nextQuasi.value.cooked;
			}
		});
	});

	// Iterate over all entries in sizeToPresetMapping to transform calls to new preset identifiers
	Object.entries(sizeToPresetMapping).forEach(([element, sizes]) => {
		Object.entries(sizes).forEach(([oldSize, newSize]) => {
			root
				.find(j.CallExpression, {
					callee: {
						object: { name: element },
						property: { name: oldSize },
					},
				})
				.forEach((path) => {
					const newIdentifier = j.identifier(newSize);
					j(path).replaceWith(newIdentifier);
					usedPresets.add(newSize);
				});
		});
	});

	// Dynamically check and remove unused typographic element imports
	Object.keys(sizeToPresetMapping).forEach((element) => {
		const isElementCalled =
			root
				.find(j.CallExpression, {
					callee: {
						object: { name: element },
					},
				})
				.size() > 0;

		if (!isElementCalled) {
			// Remove unused import specifier
			root
				.find(j.ImportDeclaration, {
					source: { value: '@guardian/source-foundations' },
				})
				.forEach((path) => {
					const newSpecifiers = path.node.specifiers.filter(
						(specifier) => specifier.imported.name !== element,
					);

					if (newSpecifiers.length > 0) {
						path.node.specifiers = newSpecifiers;
					} else {
						j(path).remove();
					}
				});
		}
	});

	// Assuming importDeclaration is defined as the specific import declaration
	// for '@guardian/source-foundations'
	const importDeclaration = root
		.find(j.ImportDeclaration, {
			source: { value: '@guardian/source-foundations' },
		})
		.get(0);

	// Add missing preset imports
	usedPresets.forEach((preset) => {
		if (
			!importDeclaration.node.specifiers.some(
				(specifier) => specifier.imported.name === preset,
			)
		) {
			importDeclaration.node.specifiers.push(
				j.importSpecifier(j.identifier(preset)),
			);
		}
	});

	return root.toSource({ quote: 'single' });
};
