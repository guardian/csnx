import { redo, undo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import type { Node as ProsemirrorNode } from 'prosemirror-model';
import { Slice } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { NodeSelection } from 'prosemirror-state';
import type { Command } from 'prosemirror-state';
import { bylineEditorSchema } from './schema';

const serializeNode = (node: ProsemirrorNode, output: string[]): void => {
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

// This runs after ProseMirror's default paste parsing, allowing us to work with
// the already-parsed document structure when pasting content.
const transformPastedNode = (
	slice: Slice,
	allowUntaggedContributors?: boolean,
	contributorLimit?: number,
) => {
	let contributorCount = 0;
	const output: ProsemirrorNode[] = [];

	const convertChipToPlaintext = (
		node: ProsemirrorNode,
		output: ProsemirrorNode[],
	) => {
		const label = node.attrs.label as string;
		if (label) {
			const textNode = bylineEditorSchema.text(label);
			output.push(textNode);
		}
	};

	slice.content.forEach((node) => {
		if (node.type.name === 'chip') {
			const type = node.attrs.type as string;

			// If there is a contributor limit and we've hit it, convert chips to plain text
			if (
				contributorLimit !== undefined &&
				contributorCount >= contributorLimit
			) {
				convertChipToPlaintext(node, output);
				return;
			}

			// If untagged contributors are not allowed, convert untagged chips to plain text
			if (type === 'untagged' && !allowUntaggedContributors) {
				convertChipToPlaintext(node, output);
			} else {
				// Keep the chip as-is
				output.push(node);
				contributorCount++;
			}
		} else if (node.isText) {
			// Keep text nodes as-is
			output.push(node);
		}
	});

	return output;
};

export const clipboardPlugin = (
	allowUntaggedContributors?: boolean,
	contributorLimit?: number,
): Plugin => {
	return new Plugin({
		props: {
			// Custom serializer for copying content from the editor
			clipboardTextSerializer: (slice) => {
				const parts: string[] = [];

				slice.content.forEach((node: ProsemirrorNode) => {
					serializeNode(node, parts);
				});

				return parts.join('');
			},
			// Transform pasted content after ProseMirror's default parsing
			transformPasted: (slice) => {
				const transformedNodes = transformPastedNode(
					slice,
					allowUntaggedContributors,
					contributorLimit,
				);

				if (transformedNodes.length > 0) {
					const newFragment = bylineEditorSchema.nodes.doc.create(
						{},
						transformedNodes,
					).content;
					return new Slice(newFragment, slice.openStart, slice.openEnd);
				}

				return slice;
			},
		},
	});
};

const deleteSelectedChip: Command = (state, dispatch) => {
	const { selection } = state;
	// Check if we have a node selection and it's a chip
	if (
		selection instanceof NodeSelection &&
		selection.node.type.name === 'chip'
	) {
		if (dispatch) {
			const tr = state.tr.deleteSelection();
			dispatch(tr);
		}
		return true;
	}
	return false;
};

export const keybindings = () =>
	keymap({
		'Mod-z': undo,
		'Mod-y': redo,
		'Mod-shift-z': redo,
		Backspace: deleteSelectedChip,
		Delete: deleteSelectedChip,
	});

export const bylinePlugin = (): Plugin => {
	return new Plugin({
		props: {
			nodeViews: {
				chip: (node, view, getPos) => {
					const dom = document.createElement('chip');
					dom.setAttribute('data-label', node.attrs.label as string);
					dom.setAttribute('data-type', node.attrs.type as string);
					dom.setAttribute('data-tag-id', node.attrs.tagId as string);
					dom.setAttribute(
						'data-tag-internal-id',
						node.attrs.tagInternalId as string,
					);
					dom.textContent = node.attrs.label as string;

					const deleteHandle = document.createElement('span');
					deleteHandle.innerHTML = '×';
					deleteHandle.title = `Delete ${node.attrs.label}`;

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
	});
};
