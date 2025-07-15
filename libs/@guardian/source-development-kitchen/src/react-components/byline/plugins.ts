import { redo, undo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import type { Node } from 'prosemirror-model';
import type { Command } from 'prosemirror-state';
import { Plugin } from 'prosemirror-state';
import { insertChip } from './lib';

const serializeNode = (node: Node, output: string[]): void => {
	if (node.isText) {
		output.push(node.text ?? '');
	} else if (node.type.name === 'chip') {
		output.push(node.attrs.label as string);
	} else if (node.isInline) {
		node.content.forEach((child) => serializeNode(child, output));
	} else {
		// fallback for other block/unknown content
		node.content.forEach((child) => serializeNode(child, output));
		output.push('\n');
	}
};

export const clipboardPlugin = (): Plugin => {
	return new Plugin({
		props: {
			clipboardTextSerializer: (slice) => {
				const parts: string[] = [];

				slice.content.forEach((node: Node) => {
					serializeNode(node, parts);
				});

				return parts.join('');
			},
		},
	});
};

export const insertChipKeyboard: Command = (state, dispatch) => {
	const { from, to } = state.selection;

	const selectedText = (() => {
		if (from === to) {
			return Math.random() > 0.5 ? 'Mahesh Makani' : 'Andrew Howe-Ely';
		}
		return state.doc.textBetween(from, to, ' ');
	})();

	return insertChip(selectedText, from, to, 'tagged')(state, dispatch);
};

export const keybindings = () =>
	keymap({
		'Mod-z': undo,
		'Mod-y': redo,
		'Mod-shift-z': redo,
		'+': insertChipKeyboard,
	});

export const bylinePlugin = (onChange: (byline: string) => void): Plugin => {
	return new Plugin({
		props: {
			nodeViews: {
				chip: (node, view, getPos) => {
					const dom = document.createElement('chip');
					dom.setAttribute('data-chip', node.attrs.label as string);
					dom.setAttribute('data-type', node.attrs.type as string);
					dom.textContent = node.attrs.label as string;

					const deleteHandle = document.createElement('span');
					deleteHandle.innerHTML = '×';

					deleteHandle.addEventListener('click', (event) => {
						event.stopPropagation();
						const pos = getPos();

						if (pos === undefined) {
							return;
						}

						const tr = view.state.tr.deleteRange(pos, pos + node.nodeSize);
						view.dispatch(tr);
					});

					dom.appendChild(deleteHandle);

					return { dom };
				},
			},
		},
		view() {
			return {
				update(view) {
					// ToDo: output a representation that includes chips
					onChange(view.state.doc.textContent);
				},
			};
		},
	});
};
