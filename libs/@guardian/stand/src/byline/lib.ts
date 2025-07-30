import type { Node } from 'prosemirror-model';
import type { Command } from 'prosemirror-state';
import type { EditorView } from 'prosemirror-view';
import { bylineEditorSchema } from './schema';

type ContributorType = 'tagged' | 'untagged';

// Name detection algorithm
const detectNameInText = (text: string): string | undefined => {
	// Simplified name pattern: Capitalized words with common name symbols
	const namePattern = /[\p{Lu}][\p{L}]*(?:[-'\s]+[\p{Lu}][\p{L}]*)*[ ]?/gu;

	// Find all matches in the text
	// Using flat() to flatten the array of matches
	const matches = Array.from(text.matchAll(namePattern)).flat();

	// return the rightmost name found or undefined if none found
	return matches.at(-1);
};

// Refocus the editor after inserting the chip, the setTimeout is used to ensure the focus happens after the DOM update
function refocusEditor(viewRef: React.MutableRefObject<EditorView | null>) {
	setTimeout(() => {
		viewRef.current?.focus();
	}, 0);
}

// Function overloads to enforce type safety
export function insertChip(
	text: string,
	from: number,
	to: number,
	type: 'tagged',
	tagId: string,
	tagInternalId: number,
): Command;
export function insertChip(
	text: string,
	from: number,
	to: number,
	type: 'untagged',
	tagId?: undefined,
	tagInternalId?: undefined,
): Command;
export function insertChip(
	text: string,
	from: number,
	to: number,
	type: ContributorType,
	tagId?: string,
	tagInternalId?: number,
): Command {
	const command: Command = (state, dispatch) => {
		const chipNode = bylineEditorSchema.nodes.chip.create({
			label: text,
			type,
			tagId,
			tagInternalId: tagInternalId?.toString() ?? '',
		});

		const tr = state.tr.replaceRangeWith(from, to, chipNode);

		if (dispatch) {
			dispatch(tr);
		}
		return true;
	};

	return command;
}

export const getCurrentText = (
	doc: Node,
	currentOffset: number,
	toOffset: number,
): {
	currentTextNode: Node | null;
	startOffset: number;
	endOffset: number;
	selectedText: string;
	hasSelection: boolean;
} => {
	const hasSelection = currentOffset !== toOffset;
	const selectedText = hasSelection
		? doc.textBetween(currentOffset, toOffset, ' ')
		: '';

	// If there's a selection, return the selected text info
	if (hasSelection) {
		return {
			currentTextNode: null,
			startOffset: -1,
			endOffset: -1,
			selectedText,
			hasSelection: true,
		};
	}

	// Otherwise, find the last text node and plausible name before the current position
	let currentTextNode: Node | null = null;
	let startOffset = -1;
	let endOffset = -1;
	let lastTextContent = '';

	doc.descendants((node, pos) => {
		// Stop traversing if we reach or pass the current offset
		if (pos >= currentOffset) {
			return false;
		}

		// If the node is a text node, check for a name
		if (node.isText && node.textContent.trim()) {
			// detect a name in the text content, and update the lastTextContent, startOffset, and endOffset accordingly
			const detectedName = detectNameInText(node.textContent);

			// If a name is detected, update the currentTextNode and offsets
			if (detectedName) {
				currentTextNode = node;
				lastTextContent = detectedName.trimEnd();
				startOffset = pos + node.textContent.indexOf(detectedName);
				endOffset = startOffset + detectedName.length;
			}
		} else if (node.type.name === 'chip') {
			// Reset on chip - we want text after the last chip
			currentTextNode = null;
			startOffset = -1;
			endOffset = -1;
			lastTextContent = '';
		}

		return true; // continue traversing
	});

	return {
		currentTextNode,
		startOffset,
		endOffset,
		selectedText: lastTextContent,
		hasSelection: false,
	};
};

export const hasHitContributorLimit = (
	doc: Node,
	contributorLimit?: number,
) => {
	if (contributorLimit === undefined) {
		return false;
	}

	const numberOfContributors = doc.children.filter(
		(c) => c.type.name === 'chip',
	).length;

	return numberOfContributors >= contributorLimit;
};

export type TaggedContributor = {
	id: string;
	label: string;
	type: string;
	internalId: number;
};

export const addUntaggedContributor = (
	viewRef: React.MutableRefObject<EditorView | null>,
	setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>,
	contributorLimit?: number,
) => {
	if (!viewRef.current) {
		return;
	}

	const { state, dispatch } = viewRef.current;

	const doc = state.doc;

	if (hasHitContributorLimit(doc, contributorLimit)) {
		return;
	}

	const {
		currentTextNode,
		startOffset,
		endOffset,
		selectedText,
		hasSelection,
	} = getCurrentText(doc, state.selection.from, state.selection.to);

	// If there's a selection, convert the selected text to a chip
	if (hasSelection) {
		setShowDropdown(false);
		const result = insertChip(
			selectedText,
			state.selection.from,
			state.selection.to,
			'untagged',
		)(state, dispatch);

		refocusEditor(viewRef);

		return result;
	}

	// Otherwise, convert the last text node to a chip
	if (!currentTextNode || startOffset === -1) {
		console.warn('No text node found in the document');
		return;
	}

	setShowDropdown(false);

	const result = insertChip(
		selectedText,
		startOffset,
		endOffset,
		'untagged',
	)(state, dispatch);

	refocusEditor(viewRef);

	return result;
};

export const addTaggedContributor = (
	contributor: TaggedContributor,
	viewRef: React.MutableRefObject<EditorView | null>,
	setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>,
	contributorLimit?: number,
) => {
	if (!viewRef.current) {
		return;
	}

	const { state, dispatch } = viewRef.current;

	const doc = state.doc;

	if (hasHitContributorLimit(doc, contributorLimit)) {
		return;
	}

	const { currentTextNode, startOffset, endOffset, hasSelection } =
		getCurrentText(doc, state.selection.from, state.selection.to);

	// If there's a selection, replace it with the tagged contributor
	if (hasSelection) {
		setShowDropdown(false);
		const result = insertChip(
			contributor.label,
			state.selection.from,
			state.selection.to,
			'tagged',
			contributor.id,
			contributor.internalId,
		)(state, dispatch);

		refocusEditor(viewRef);

		return result;
	}

	// Otherwise, replace the last text node with the tagged contributor
	if (!currentTextNode || startOffset === -1) {
		console.warn('No text node found in the document');
		return;
	}

	setShowDropdown(false);

	const result = insertChip(
		contributor.label,
		startOffset,
		endOffset,
		'tagged',
		contributor.id,
		contributor.internalId,
	)(state, dispatch);

	refocusEditor(viewRef);

	return result;
};

type BylinePart =
	| {
			type: 'text';
			value: string;
	  }
	| {
			type: 'contributor';
			value: string;
			// if tagId and tagInternalId are provided, this is a tagged contributor
			// otherwise, it's an untagged contributor
			tagId?: string;
			tagInternalId?: string;
	  };

export type BylineModel = BylinePart[];

export const convertBylineModelToNode = (value?: BylineModel): Node => {
	const nodes: Node[] = (value ?? []).map((part) => {
		if (part.type === 'contributor') {
			return bylineEditorSchema.nodes.chip.create({
				label: part.value,
				type: part.tagInternalId ? 'tagged' : 'untagged',
				tagId: part.tagId,
				tagInternalId: part.tagInternalId,
			});
		} else {
			return bylineEditorSchema.text(part.value);
		}
	});
	return bylineEditorSchema.node('doc', null, nodes);
};

export const convertNodeToBylineModel = (doc: Node): BylineModel => {
	const model: BylineModel = [];
	doc.forEach((node) => {
		if (node.isText) {
			model.push({
				type: 'text',
				value: node.text ?? '',
			});
		} else if (node.type.name === 'chip') {
			model.push({
				type: 'contributor',
				value: node.attrs.label as string,
				tagId: node.attrs.tagId as string,
				tagInternalId: node.attrs.tagInternalId as string,
			});
		}
	});
	return model;
};
