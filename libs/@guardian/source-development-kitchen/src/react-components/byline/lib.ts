// import { faker } from '@faker-js/faker';
import type { Node } from 'prosemirror-model';
import type { Command } from 'prosemirror-state';
import type { EditorView } from 'prosemirror-view';
import { contributors } from './contributors';
import { bylineEditorSchema } from './schema';

type ContributorType = 'tagged' | 'untagged';

// Name detection algorithm
const detectNameInText = (text: string): string | undefined => {
	// Simplified name pattern: Capitalized words with common name symbols
	const namePattern = /[\p{Lu}][\p{L}]*(?:[-'\s]+[\p{Lu}][\p{L}]*)*/gu;

	// Find all matches in the text
	// Using flat() to flatten the array of matches
	const matches = Array.from(text.matchAll(namePattern)).flat();

	// return the rightmost name found or undefined if none found
	return matches.length > 0 ? matches.at(-1) : undefined;
};

// Refocus the editor after inserting the chip, the setTimeout is used to ensure the focus happens after the DOM update
function refocusEditor(viewRef: React.MutableRefObject<EditorView | null>) {
	setTimeout(() => {
		viewRef.current?.focus();
	}, 0);
}

export const insertChip = (
	text: string,
	from: number,
	to: number,
	type: ContributorType,
) => {
	const command: Command = (state, dispatch) => {
		const chipNode = bylineEditorSchema.nodes.chip.create({
			label: text,
			type,
		});

		const tr = state.tr.replaceRangeWith(from, to, chipNode);

		if (dispatch) {
			dispatch(tr);
		}
		return true;
	};

	return command;
};

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

	// Otherwise, find the last text node before the current position
	let currentTextNode: Node | null = null;
	let startOffset = -1;
	let endOffset = -1;
	let lastTextContent = '';

	doc.descendants((node, pos) => {
		// Stop traversing if we reach or pass the current offset
		if (pos >= currentOffset) {
			return false;
		}

		if (node.isText && node.textContent.trim()) {
			currentTextNode = node;
			startOffset = pos;
			endOffset = pos + node.nodeSize;
			lastTextContent = node.textContent;

			// detect a name in the text content, and update the lastTextContent, startOffset, and endOffset accordingly
			const detectedName = detectNameInText(node.textContent);

			if (detectedName) {
				lastTextContent = detectedName;
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

export const getTaggedContributors = ({ name }: { name: string }): string[] => {
	// // This is a placeholder function that simulates fetching tagged contributors
	// // In a real application, this would fetch from a database or API
	// return Array.from({ length: 5 }, () => {
	// 	return faker.person.fullName({
	// 		firstName: name,
	// 	});
	// });

	return contributors
		.filter((contributor) =>
			contributor.toLowerCase().startsWith(name.toLowerCase()),
		)
		.slice(0, 4);
};

export const addUntaggedContributor = (
	viewRef: React.MutableRefObject<EditorView | null>,
	setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	if (!viewRef.current) {
		return;
	}

	const { state, dispatch } = viewRef.current;

	const doc = state.doc;

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
	contributor: string,
	viewRef: React.MutableRefObject<EditorView | null>,
	setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	if (!viewRef.current) {
		return;
	}

	const { state, dispatch } = viewRef.current;

	const doc = state.doc;

	const { currentTextNode, startOffset, endOffset, hasSelection } =
		getCurrentText(doc, state.selection.from, state.selection.to);

	// If there's a selection, replace it with the tagged contributor
	if (hasSelection) {
		setShowDropdown(false);
		const result = insertChip(
			contributor,
			state.selection.from,
			state.selection.to,
			'tagged',
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
		contributor,
		startOffset,
		endOffset,
		'tagged',
	)(state, dispatch);

	refocusEditor(viewRef);

	return result;
};
