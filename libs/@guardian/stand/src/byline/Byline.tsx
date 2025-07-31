import {
	createInvisiblesPlugin,
	nbSpace,
	space,
} from '@guardian/prosemirror-invisibles';
import { dropCursor } from 'prosemirror-dropcursor';
import { history } from 'prosemirror-history';
import type { Node } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { useEffect, useRef, useState } from 'react';
import type { BylineModel, TaggedContributor } from './lib';
import {
	addTaggedContributor,
	addUntaggedContributor,
	convertBylineModelToNode,
	convertNodeToBylineModel,
	getCurrentText,
	hasHitContributorLimit,
} from './lib';
import { createPlaceholderPlugin } from './placeholder';
import { bylinePlugin, clipboardPlugin, keybindings } from './plugins';
import { Preview } from './Preview';
import { bylineEditorSchema } from './schema';
import {
	bylineContainerStyles,
	bylineEditorStyles,
	dropdownContainerStyles,
	dropdownLiStyles,
	dropdownUlStyles,
	selectedDropdownLiStyles,
} from './styles';
import type { PartialBylineTheme } from './theme';

type BylineProps = {
	theme?: PartialBylineTheme;
	allowUntaggedContributors?: boolean;
	contributorLimit?: number;
	enablePreview?: boolean;
	placeholder?: string;
	initialValue?: BylineModel;
	handleSave: (newValue: BylineModel) => void;
	searchContributors?: (selectedText: string) => Promise<TaggedContributor[]>;
};

export const Byline = ({
	theme,
	allowUntaggedContributors,
	contributorLimit,
	enablePreview,
	placeholder,
	initialValue,
	handleSave,
	searchContributors,
}: BylineProps) => {
	const editorRef = useRef<HTMLDivElement>(null);
	const viewRef = useRef<EditorView | null>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [currentText, setCurrentText] = useState('');
	const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
	const [taggedContributors, setTaggedContributors] = useState<
		TaggedContributor[]
	>([]);
	const [addedTaggedContributors, setAddedTaggedContributors] = useState<
		TaggedContributor[]
	>([]);
	const [currentDoc, setCurrentDoc] = useState<Node | null>(null);
	const [allowSave, setAllowSave] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);

	const hideOrShowDropdown = (view: EditorView) => {
		/**
		 * Determines whether to hide or show the contributor dropdown based on component props,
		 * and should be used in combination with the selected/current text when calling setShowDropdown
		 * The logic evaluates to true when either:
		 * - There are search contributors available OR
		 * - Untagged contributors are allowed
		 */
		const showDropdownBasedOnProps =
			!!searchContributors || !!allowUntaggedContributors;

		const { selectedText, startOffset, endOffset, hasSelection } =
			getCurrentText(
				view.state.doc,
				view.state.selection.from,
				view.state.selection.to,
			);

		if (hasHitContributorLimit(view.state.doc, contributorLimit)) {
			return false;
		}

		// If there's a selection, show dropdown if selection has content
		if (hasSelection) {
			setShowDropdown(selectedText.trim() !== '' && showDropdownBasedOnProps);
			return false;
		}

		// For cursor position, only show dropdown if cursor is within the detected text range
		const cursorPosition = view.state.selection.from;
		const isWithinDetectedText =
			startOffset !== -1 &&
			cursorPosition >= startOffset &&
			cursorPosition <= endOffset;

		setShowDropdown(
			selectedText.trim() !== '' &&
				isWithinDetectedText &&
				showDropdownBasedOnProps,
		);
		return false;
	};

	const [enterHit, setEnterHit] = useState(false);

	// We don't have access to the React state in the dom events handler
	const checkDropdownVisibility = () => {
		// This function is only newly available since 2024
		if (dropdownRef.current?.checkVisibility) {
			return dropdownRef.current.checkVisibility();
		} else {
			return dropdownRef.current?.offsetParent !== null;
		}
	};

	// Handle save when document or added contributors change
	useEffect(() => {
		if (currentDoc && !allowSave) {
			// If allowSave is false, we need to set it to true
			// this only needs to run once after the first transaction
			// i.e after the initial doc state is set
			setAllowSave(true);
		}

		if (currentDoc && allowSave) {
			handleSave(convertNodeToBylineModel(currentDoc, addedTaggedContributors));
		}
	}, [currentDoc]);

	useEffect(() => {
		if (!editorRef.current) {
			return;
		}

		const initialDoc = convertBylineModelToNode(initialValue);

		const state = EditorState.create({
			schema: bylineEditorSchema,
			plugins: [
				dropCursor(),
				clipboardPlugin(allowUntaggedContributors, contributorLimit),
				history(),
				keybindings(),
				createInvisiblesPlugin([space, nbSpace], {
					displayLineEndSelection: true,
					shouldShowInvisibles: true,
				}),
				bylinePlugin(),
				createPlaceholderPlugin(placeholder ?? 'Enter a byline...'),
			],
			doc: initialDoc,
		});

		// Set the initial document in the preview
		setCurrentDoc(initialDoc);

		viewRef.current = new EditorView(editorRef.current, {
			state,
			attributes: {
				role: 'combobox',
				'aria-label': 'byline',
				'aria-controls': 'byline-dropdown',
				'aria-expanded': 'false',
			},
			handleDOMEvents: {
				focus: hideOrShowDropdown,
				keyup: (view, event) => {
					// Skip escape key on keyup to prevent reopening dropdown
					if (event.key === 'Escape') {
						return false;
					}
					return hideOrShowDropdown(view);
				},
				keydown: (view, event) => {
					// Handle escape key for dropdown
					if (event.key === 'Escape') {
						setShowDropdown(false);

						// Always return true to prevent other escape handlers
						return true;
					}
					if (event.key === 'ArrowDown') {
						if (checkDropdownVisibility()) {
							event.preventDefault();
							setCurrentOptionIndex((currentOptionIndex) => {
								return currentOptionIndex + 1;
							});

							return true;
						}
						return false;
					}
					if (event.key === 'ArrowUp') {
						if (checkDropdownVisibility()) {
							event.preventDefault();

							setCurrentOptionIndex((currentOptionIndex) => {
								return currentOptionIndex - 1;
							});
							return true;
						}
						return false;
					}
					if (event.key === 'Enter') {
						if (checkDropdownVisibility()) {
							event.preventDefault();
							setEnterHit(true);
						}
						return false;
					}

					return false;
				},
				blur: (_view, event) => {
					if (
						!dropdownRef.current?.contains(event.relatedTarget as HTMLElement)
					) {
						setShowDropdown(false);
					}
					return false;
				},
			},
			dispatchTransaction(tr) {
				const newState = viewRef.current?.state.apply(tr);
				if (newState) {
					viewRef.current?.updateState(newState);
					const { selectedText } = getCurrentText(
						newState.doc,
						newState.selection.from,
						newState.selection.to,
					);

					setCurrentText(selectedText);

					if (selectedText.trim() === '') {
						setTaggedContributors([]);
						setShowDropdown(false);
					}

					if (searchContributors && selectedText.trim() !== '') {
						// Fetch contributors based on the selected text
						void searchContributors(selectedText)
							.then((contributors) => {
								setTaggedContributors(contributors);
							})
							.catch((error) => {
								console.error('Error fetching tagged contributors:', error);
								setTaggedContributors([]);
							});
					}

					// Update the current document state after each transaction
					// if a transform step has happened
					if (tr.steps.length > 0) {
						setCurrentDoc(newState.doc);
					}
				}
			},
		});

		return () => {
			viewRef.current?.destroy();
		};
	}, []);

	useEffect(() => {
		const numberOfOptions =
			taggedContributors.length + (allowUntaggedContributors ? 1 : 0);
		if (numberOfOptions) {
			// Going up from the first option
			if (currentOptionIndex < 0) {
				setCurrentOptionIndex(numberOfOptions - 1);
			} else {
				setCurrentOptionIndex(currentOptionIndex % numberOfOptions);
			}
		}
		if (showDropdown) {
			const editor = document.querySelector('[role=combobox]');
			editor?.setAttribute(
				'aria-activedescendant',
				`contributor-option-${currentOptionIndex}`,
			);
			editor?.setAttribute('aria-expanded', 'true');
		}
	}, [
		currentOptionIndex,
		showDropdown,
		taggedContributors.length,
		allowUntaggedContributors,
	]);

	useEffect(() => {
		if (enterHit) {
			if (
				allowUntaggedContributors &&
				currentOptionIndex === taggedContributors.length
			) {
				addUntaggedContributor(viewRef, setShowDropdown, contributorLimit);
			} else {
				const contributorToAdd = taggedContributors[currentOptionIndex];

				if (contributorToAdd) {
					addTaggedContributor(
						contributorToAdd,
						viewRef,
						setShowDropdown,
						setAddedTaggedContributors,
						contributorLimit,
					);
				}
			}

			setEnterHit(false);
		}
	}, [
		currentOptionIndex,
		enterHit,
		taggedContributors,
		contributorLimit,
		allowUntaggedContributors,
	]);

	return (
		<div css={bylineContainerStyles}>
			<div css={bylineEditorStyles(theme?.editor)} ref={editorRef} />
			<div
				ref={dropdownRef}
				tabIndex={0}
				css={dropdownContainerStyles(
					showDropdown &&
						// show the dropdown if there are tagged contributors to select or untagged contributors are allowed
						(taggedContributors.length > 0 || !!allowUntaggedContributors),
					theme?.dropdown,
				)}
			>
				<ul id="byline-dropdown" role="listbox" css={dropdownUlStyles}>
					{taggedContributors.map((contributor, i) => (
						<li
							key={contributor.tagId}
							id={`contributor-option-${i}`}
							role="option"
							aria-selected={i === currentOptionIndex}
							css={[
								dropdownLiStyles(theme),
								i === currentOptionIndex && selectedDropdownLiStyles(theme),
							]}
							onMouseMove={() => {
								if (currentOptionIndex !== i) {
									setCurrentOptionIndex(i);
								}
							}}
							onMouseDown={(e) => {
								e.preventDefault(); // Prevent focus loss
								addTaggedContributor(
									contributor,
									viewRef,
									setShowDropdown,
									setAddedTaggedContributors,
									contributorLimit,
								);
							}}
						>
							{contributor.label}
						</li>
					))}
					{allowUntaggedContributors && (
						<li
							role="option"
							id={`contributor-option-${taggedContributors.length}`}
							aria-selected={currentOptionIndex === taggedContributors.length}
							css={[
								dropdownLiStyles(theme),
								currentOptionIndex === taggedContributors.length &&
									selectedDropdownLiStyles(theme),
							]}
							onMouseMove={() => {
								if (currentOptionIndex !== taggedContributors.length) {
									setCurrentOptionIndex(taggedContributors.length);
								}
							}}
							onMouseDown={(e) => {
								e.preventDefault(); // Prevent focus loss
								addUntaggedContributor(
									viewRef,
									setShowDropdown,
									contributorLimit,
								);
							}}
						>
							Add "{currentText}" as untagged contributor
						</li>
					)}
				</ul>
			</div>

			{enablePreview && <Preview doc={currentDoc} />}
		</div>
	);
};
