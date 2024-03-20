import type { Rule } from 'eslint';

export const useTypographyPresets: Rule.RuleModule = {
	meta: {
		type: 'suggestion',
		docs: {
			description:
				'suggest using titlepiece preset instead of titlepiece.small()',
			category: 'Best Practices',
			recommended: true,
		},
		fixable: 'code', // Indicates that this rule is automatically fixable
		schema: [], // No options for this rule
		messages: {
			usePreset: 'Use titlepiece42 instead of titlepiece.small().',
		},
	},
	create(context) {
		return {
			CallExpression(node) {
				if (node.callee.type === 'MemberExpression') {
					const object = node.callee.object;
					const property = node.callee.property;

					if (
						object.type === 'Identifier' &&
						object.name === 'titlepiece' &&
						property.type === 'Identifier' &&
						property.name === 'small'
					) {
						context.report({
							node,
							messageId: 'usePreset',
							fix(fixer) {
								return fixer.replaceText(node, 'titlepiece42');
							},
						});
					}
				}
			},
		};
	},
};
