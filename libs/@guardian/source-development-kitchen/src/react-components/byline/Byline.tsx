import { history } from 'prosemirror-history';
import type { Node } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { useEffect, useRef, useState } from 'react';
import 'prosemirror-view/style/prosemirror.css';
import {
	addTaggedContributor,
	addUntaggedContributor,
	getCurrentText,
	getTaggedContributors,
} from './lib';
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

export const Byline = () => {
	const editorRef = useRef<HTMLDivElement>(null);
	const viewRef = useRef<EditorView | null>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [currentText, setCurrentText] = useState('');
	const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
	const [taggedContributors, setTaggedContributors] = useState<string[]>([]);

	const [previewDoc, setPreviewDoc] = useState<Node | null>(null);

	const [showDropdown, setShowDropdown] = useState(false);
	const hideOrShowDropdown = (view: EditorView) => {
		const { selectedText, startOffset, endOffset, hasSelection } =
			getCurrentText(
				view.state.doc,
				view.state.selection.from,
				view.state.selection.to,
			);

		// If there's a selection, show dropdown if selection has content
		if (hasSelection) {
			setShowDropdown(selectedText.trim() !== '');
			return false;
		}

		// For cursor position, only show dropdown if cursor is within the detected text range
		const cursorPosition = view.state.selection.from;
		const isWithinDetectedText =
			startOffset !== -1 &&
			cursorPosition >= startOffset &&
			cursorPosition <= endOffset;

		setShowDropdown(selectedText.trim() !== '' && isWithinDetectedText);
		return false;
	};
	const [enterHit, setEnterHit] = useState(false);

	// We don't have access to the React state in the dom events handler
	const checkDropdownVisibility = () => dropdownRef.current?.checkVisibility();

	const onChange = (byline: string) =>
		dispatchEvent(
			new CustomEvent('bylineChange', {
				detail: byline,
			}),
		);

	useEffect(() => {
		if (!editorRef.current) {
			return;
		}

		const state = EditorState.create({
			schema: bylineEditorSchema,
			plugins: [
				clipboardPlugin(),
				history(),
				keybindings(),
				bylinePlugin(onChange),
			],
		});

		viewRef.current = new EditorView(editorRef.current, {
			state,
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
						// Check current dropdown state and close if open
						setShowDropdown((currentShowDropdown) => {
							if (currentShowDropdown) {
								return false; // Close the dropdown
							}
							return currentShowDropdown; // Keep current state
						});

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

					const taggedContributors = getTaggedContributors({
						name: selectedText,
					});

					setTaggedContributors(taggedContributors);

					setPreviewDoc(newState.doc);
				}
			},
		});

		return () => {
			viewRef.current?.destroy();
		};
	}, []);

	useEffect(() => {
		if (currentOptionIndex < 0) {
			setCurrentOptionIndex(taggedContributors.length);
		} else {
			setCurrentOptionIndex(
				currentOptionIndex % (taggedContributors.length + 1),
			);
		}
	}, [currentOptionIndex, taggedContributors.length]);

	useEffect(() => {
		if (enterHit) {
			if (currentOptionIndex === taggedContributors.length) {
				addUntaggedContributor(viewRef, setShowDropdown);
			} else {
				const contributorToAdd = taggedContributors[currentOptionIndex];

				if (contributorToAdd) {
					addTaggedContributor(contributorToAdd, viewRef, setShowDropdown);
				}
			}

			setEnterHit(false);
		}
	}, [currentOptionIndex, enterHit, taggedContributors]);

	return (
		<div css={bylineContainerStyles}>
			<div css={bylineEditorStyles} ref={editorRef} />
			<div
				ref={dropdownRef}
				tabIndex={0}
				role="group"
				aria-live="polite"
				css={dropdownContainerStyles(showDropdown)}
			>
				<ul css={dropdownUlStyles}>
					{taggedContributors.map((contributor, i) => (
						<li
							key={contributor + i}
							role="option"
							aria-selected={i === currentOptionIndex}
							css={[
								dropdownLiStyles,
								i === currentOptionIndex && selectedDropdownLiStyles,
							]}
							onMouseDown={(e) => {
								e.preventDefault(); // Prevent focus loss
								addTaggedContributor(contributor, viewRef, setShowDropdown);
							}}
						>
							{contributor}
						</li>
					))}
					<li
						role="option"
						aria-selected={currentOptionIndex === taggedContributors.length}
						css={[
							dropdownLiStyles,
							currentOptionIndex === taggedContributors.length &&
								selectedDropdownLiStyles,
						]}
						onMouseDown={(e) => {
							e.preventDefault(); // Prevent focus loss
							addUntaggedContributor(viewRef, setShowDropdown);
						}}
					>
						Add "{currentText}" as untagged contributor
					</li>
				</ul>
			</div>

			<Preview doc={previewDoc} />
		</div>
	);
};
