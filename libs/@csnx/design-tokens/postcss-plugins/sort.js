// var postcss = require('postcss');

const categoryRE = /--source-(\w+).*/;

const plugin = (opts = {}) => {
	return {
		postcssPlugin: 'sort-custom-props',
		Once(root, { result }) {
			root.walkRules((rule) => {
				// console.log(rule.nodes[1]);
				rule.nodes = rule.nodes.sort(function (a, b) {
					if (a.prop && b.prop) {
						return a.prop.toLowerCase().localeCompare(b.prop.toLowerCase());
					}
					if (a.prop) return 1;
					if (b.prop) return -1;
					return 0;
				});

				// this doesn't work, but it's close to inserting a category comment
				// before the first node of that category

				// rule.append({ text: 'Comment' });

				// for (const [i, node] of rule.nodes.entries()) {
				// 	const category = categoryRE.exec(node.prop)[1];
				// 	const nextCategory = categoryRE.exec(rule.nodes[i + 1]?.prop)[1];

				// 	if (i === 0) {
				// 		rule.insertBefore(node, {
				// 			text: category,
				// 			type: 'comment',
				// 			raws: { before: '\n\t', left: ' ', right: ' ' },
				// 		});
				// 		continue;
				// 	}
				// 	if (i === rule.nodes.entries().length) {
				// 		continue;
				// 	}
				// 	try {
				// 		if (category !== category) {
				// 			rule.insertBefore(node, {
				// 				text: category,
				// 				type: 'comment',
				// 				raws: { before: '\n\n\t', left: ' ', right: ' ' },
				// 			});
				// 		}
				// 	} catch (e) {}
				// }
			});
		},
	};
};
plugin.postcss = true;
module.exports = plugin;
