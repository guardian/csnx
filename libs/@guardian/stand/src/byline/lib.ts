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
	path?: string,
): Command;
export function insertChip(
	text: string,
	from: number,
	to: number,
	type: 'untagged',
	tagId?: undefined,
): Command;
export function insertChip(
	text: string,
	from: number,
	to: number,
	type: ContributorType,
	tagId?: string,
	path?: string,
): Command {
	const command: Command = (state, dispatch) => {
		const chipNode = bylineEditorSchema.nodes.chip.create({
			label: text,
			type,
			tagId,
			path,
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
	tagId: string; // unique id for the contributor
	label: string; // display text for the contributor, usually their name
	path?: string; // optional path parameter linking to their Guardian profile, e.g. profile/joebloggs
	// additional metadata e.g. the tag object from tag manager/capi
	// this allows us to persist the meta data back to the consumer
	// so it makes it possible to avoid additional network requests
	// to load the full tag object
	// use type guards, validation library (like zod), or an `as` assertion when using this
	meta?: unknown;
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
	setAddedTaggedContributors: React.Dispatch<
		React.SetStateAction<TaggedContributor[]>
	>,
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
		setAddedTaggedContributors((prev) => [...prev, contributor]);
		const result = insertChip(
			contributor.label,
			state.selection.from,
			state.selection.to,
			'tagged',
			contributor.tagId,
			contributor.path,
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
	setAddedTaggedContributors((prev) => [...prev, contributor]);

	const result = insertChip(
		contributor.label,
		startOffset,
		endOffset,
		'tagged',
		contributor.tagId,
		contributor.path,
	)(state, dispatch);

	refocusEditor(viewRef);

	return result;
};

type BylineText = {
	type: 'text';
	value: string;
};

type BylineContributor = {
	type: 'contributor';
	value: string; // display text for the contributor, usually their name
	tagId?: string; // if tagId doesn't exist then it's an untagged contributor, usually a unique id for the tagged contributor
	path?: string; // optional path parameter linking to their Guardian profile, e.g. profile/joebloggs
	meta?: unknown; // additional metadata e.g. the tag object from tag manager/capi, use type guards, validation library (like zod), or an `as` assertion when using this
};

type BylinePart = BylineText | BylineContributor;

export type BylineModel = BylinePart[];

export const convertBylineModelToNode = (value?: BylineModel): Node => {
	const nodes: Node[] = (value ?? []).map((part) => {
		if (part.type === 'contributor') {
			return bylineEditorSchema.nodes.chip.create({
				label: part.value,
				type: part.tagId ? 'tagged' : 'untagged',
				tagId: part.tagId,
				path: part.path,
			});
		} else {
			return bylineEditorSchema.text(part.value);
		}
	});
	return bylineEditorSchema.node('doc', null, nodes);
};

export const convertNodeToBylineModel = (
	doc: Node,
	addedTaggedContributors: TaggedContributor[],
): BylineModel => {
	const model: BylineModel = [];
	doc.forEach((node) => {
		if (node.isText) {
			model.push({
				type: 'text',
				value: node.text ?? '',
			});
		} else if (node.type.name === 'chip') {
			// check if the chip exists in the addedTaggedContributors
			const maybeAddedTaggedContributor = addedTaggedContributors.find(
				(c) => c.tagId === node.attrs.tagId,
			);

			// if it exists, use the data from the addedTaggedContributors
			// this allows us to persist meta data back to the consumer
			// e.g. the tag object from tag manager/capi
			if (maybeAddedTaggedContributor) {
				model.push({
					type: 'contributor',
					value: maybeAddedTaggedContributor.label,
					tagId: maybeAddedTaggedContributor.tagId,
					path: maybeAddedTaggedContributor.path,
					meta: maybeAddedTaggedContributor.meta,
				});
			} else {
				// otherwise, use the data from the node
				model.push({
					type: 'contributor',
					value: node.attrs.label as string,
					tagId: node.attrs.tagId as string,
					path: node.attrs.path as string,
				});
			}
		}
	});
	return model;
};
