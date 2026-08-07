import type { Plugin, TokenTransformed } from '@terrazzo/parser';
import { FORMAT_ID as FORMAT_CSS } from '@terrazzo/plugin-css';
import { camelCase } from 'scule';

export interface TypographyOptions {
	/**
	 * Name the output file.
	 * @default "typography.ts"
	 */
	filename?: string;
	/**
	 * IDs of tokens to include in output
	 */
	include?: string | string[];
}

const PLUGIN_NAME = 'typography';

export default function typography({
	filename = 'typography.ts',
	include,
}: TypographyOptions = {}): Plugin {
	return {
		name: PLUGIN_NAME,
		async build({ context, getTransforms, outputFile }) {
			const css = getTransforms({ format: FORMAT_CSS, id: include });
			const tokens = {} as any;

			// 1. Get base groups
			css.sort(alphaComparator);
			for (const token of css) {
				if (!token.localID) {
					context.logger.warn({
						group: 'plugin',
						label: PLUGIN_NAME,
						message: `Token ${token.id} missing CSS var`,
					});
				}

				let node = tokens;
				const parts = token.id.split('.');
				const last = parts.pop()!;
				for (const next of parts) {
					const key = camelCase(next);
					if (!(key in node)) {
						node[key] = {};
					}
					node = node[key];
				}

				let tokenValue: any = `var(${token.localID})`;
				if (
					token.token.$type === 'typography' &&
					token.type === 'MULTI_VALUE'
				) {
					tokenValue = {};
					for (const property of Object.keys(token.value)) {
						tokenValue[camelCase(property)] =
							`var(${token.localID}-${property})`;
					}
				}

				node[camelCase(last)] = token.token.jsonID.endsWith('/$root')
					? { $root: tokenValue }
					: tokenValue;
			}

			// 2. for groups with $root, flatten the nesting
			// note: we’re doing this from 2 levels up to modify this object on the fly without breaking or interrupting our walker
			walk(tokens, (parent) => {
				if (parent && typeof parent === 'object') {
					for (const a of Object.keys(parent)) {
						if (parent[a].$root) {
							let shouldHoist = true;
							for (const b of Object.keys(parent[a]).filter(
								(id) => id !== '$root',
							)) {
								const hoistedName = camelCase(`${a}-${b}`);
								if (hoistedName in parent[a]) {
									context.logger.warn({
										group: 'plugin',
										label: PLUGIN_NAME,
										message: `Could not hoist …${a}.$root because it conflicts with sibling token name ${b}`,
									});
									shouldHoist = false;
									break;
								}
								parent[hoistedName] = parent[a][b];
							}
							// only at the very end can we overwrite the $root, at which point the previous refs will disappear
							if (shouldHoist) {
								parent[a] = parent[a].$root;
							}
						}
					}
				}
			});

			// 3. second pass: build output
			// TODO: flatten to single level so we don't have to assume structure
			let js = '';
			for (const parentGroup of Object.keys(tokens)) {
				for (const group of Object.keys(tokens[parentGroup])) {
					for (const typography of Object.keys(tokens[parentGroup][group])) {
						js += `export const ${jsIdent(typography)} = \`\n`;
						js += `  font-family: ${tokens[parentGroup][group][typography].fontFamily};\n`;
						js += `  font-size: ${tokens[parentGroup][group][typography].fontSize};\n`;
						js += `  line-height: ${tokens[parentGroup][group][typography].lineHeight};\n`;
						js += `  font-weight: ${tokens[parentGroup][group][typography].fontWeight};\n`;
						js += `  letter-spacing: ${tokens[parentGroup][group][typography].letterSpacing};\n`;
						js += `\`;\n`;
					}
				}
			}

			outputFile(filename, js);
		},
	};
}

/** Simple walker */
function walk(
	root: Record<string, any>,
	cb: (node: Record<string, any>) => void,
) {
	if (root && typeof root === 'object' && !Array.isArray(root)) {
		for (const child of Object.values(root)) {
			cb(child);
			walk(child, cb);
		}
	}
}

/** Make a name into a valid JS identifier by adding a preceding _ */
function jsIdent(name: string): string {
	return /^[A-Za-z$_]/.test(name) ? name : `_${name}`;
}

/** JS compiler-optimizable comparator */
export function alphaComparator(
	a: TokenTransformed,
	b: TokenTransformed,
): number {
	return a.id.localeCompare(b.id, 'en-us', { numeric: true });
}
