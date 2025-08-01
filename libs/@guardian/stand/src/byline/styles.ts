import { css } from '@emotion/react';
import type { Node } from 'prosemirror-model';
import type { PartialBylineTheme } from './theme';

export const bylineContainerStyles = css`
	position: relative;
	width: 100%;
`;

export const bylineEditorStyles = (theme: PartialBylineTheme['editor']) => css`
	border: ${theme?.border ?? '1px black solid'};
	background-color: ${theme?.background ?? 'white'};
	color: ${theme?.color ?? 'inherit'};

	/* ProseMirror styles from prosemirror-view/styles/prosemirror.css */
	.ProseMirror {
		padding: 8px 4px;
		word-wrap: break-word;
		white-space: pre-wrap;
		white-space: break-spaces;
		-webkit-font-variant-ligatures: none;
		font-variant-ligatures: none;
		font-feature-settings: 'liga' 0; /* the above doesn't seem to work in Edge */
	}

	.ProseMirror pre {
		white-space: pre-wrap;
	}

	.ProseMirror li {
		position: relative;
	}

	.ProseMirror-hideselection *::selection {
		background: transparent;
	}
	.ProseMirror-hideselection *::-moz-selection {
		background: transparent;
	}
	.ProseMirror-hideselection {
		caret-color: transparent;
	}

	/* See https://github.com/ProseMirror/prosemirror/issues/1421#issuecomment-1759320191 */
	.ProseMirror [draggable][contenteditable='false'] {
		user-select: text;
	}

	.ProseMirror-selectednode {
		outline: ${theme?.chip?.selected?.border ?? '1px solid #b4d9ff'};
	}

	/* Make sure li selections wrap around markers */

	li.ProseMirror-selectednode {
		outline: none;
	}

	li.ProseMirror-selectednode:after {
		content: '';
		position: absolute;
		left: -32px;
		right: -2px;
		top: -2px;
		bottom: -2px;
		border: ${theme?.chip?.selected?.border ?? '1px solid #b4d9ff'};
		pointer-events: none;
	}

	/* Protect against generic img rules */

	img.ProseMirror-separator {
		display: inline !important;
		border: none !important;
		margin: 0 !important;
	}

	.ProseMirror:focus {
		outline: none;
	}

	/* Invisible styles from @guardian/prosemirror-invisibles/dist/style.css */

	.invisible {
		/* Chrome in particular dislikes doing the right thing
		* with carets and inline elements when contenteditable
		* is 'false'. See e.g. https://github.com/ProseMirror/prosemirror/issues/1061
   		*/
		display: inline;
		position: relative;
		pointer-events: none;
	}

	.invisible:before {
		position: relative;
		caret-color: inherit;
		color: gray;
		display: inline-block;
		font-weight: 400;
		font-style: normal;
		line-height: initial;
		width: 0;
		top: 0;
		left: 0;
		z-index: 1;
	}

	.invisible__selected-marker {
		position: absolute;
		caret-color: inherit;
		background-color: #dcdcdc;
		display: inline-block;
		font-weight: 400;
		font-style: normal;
		line-height: initial;
		top: 0;
		left: 0;
		width: 10px;
		height: 100%;
		z-index: 0;
	}

	.ProseMirror-focused .invisible__selected-marker {
		background-color: #b4d9ff;
	}

	.ProseMirror-focused .invisible--is-selected::before {
		background-color: #b4d8ff;
	}

	.invisible--is-selected::before {
		background-color: #dcdcdc;
	}

	.invisible--space:before {
		content: '·';
	}

	.invisible--nb-space {
		vertical-align: text-bottom;
	}

	.invisible--nb-space:before {
		font-size: 15px;
		content: '^';
		position: absolute;
		top: 9px;
		left: -1px;
	}

	chip {
		border: ${theme?.chip?.border ?? '2px solid lightgrey'};
		border-radius: ${theme?.chip?.borderRadius ?? '8px'};
		padding: ${theme?.chip?.padding ?? '2px 4px'};
		color: ${theme?.chip?.color ?? 'inherit'};

		cursor: default;

		&[data-type='tagged'] {
			background-color: ${theme?.chip?.taggedBackground ?? 'lightgrey'};
		}

		&[data-type='untagged'] {
			color: ${theme?.chip?.untagged?.color ?? 'inherit'};
		}

		::after {
			content: '';
			display: inline-block;
		}

		span {
			cursor: pointer;
			margin-left: 5px;
		}
	}

	/* Leave space between subsequent chips */
	chip + chip {
		margin-left: 3px;
	}

	.placeholder {
		display: inline-block;
		height: 0;
		width: 0;
		white-space: nowrap;
		color: ${theme?.placeholder?.color ?? '#777575'};
		pointer-events: none;
		cursor: text;
	}
`;

export const dropdownContainerStyles = (
	showDropdown: boolean,
	theme?: PartialBylineTheme['dropdown'],
) => css`
	position: absolute;
	box-sizing: border-box;
	width: 100%;
	z-index: 1000;
	border: ${theme?.border ?? '1px solid #ccc'};
	background-color: ${theme?.background ?? 'rgba(255, 255, 255, 0.8)'};
	display: ${showDropdown ? 'block' : 'none'};
`;

export const dropdownUlStyles = css`
	margin: 0;
	padding: 0;
	list-style-type: none;
`;

export const dropdownLiStyles = (theme?: PartialBylineTheme) => css`
	cursor: pointer;
	padding: 5px;
	border-bottom: ${theme?.dropdown?.li?.borderBottom ?? '1px solid #ccc'};
	color: ${theme?.dropdown?.li?.color ?? 'inherit'};
`;

export const selectedDropdownLiStyles = (theme?: PartialBylineTheme) => css`
	background-color: ${theme?.dropdown?.li?.selected?.background ?? 'cadetblue'};
	color: ${theme?.dropdown?.li?.selected?.color ?? 'white'};
`;

export const previewStyles = css`
	margin-top: 5px;
	white-space: pre;
`;

export const previewFreeTextStyles = css`
	font-style: italic;
`;

export const previewContributorStyles = (node: Node) => css`
	${node.attrs.type === 'tagged' ? 'text-decoration: underline;' : ''}
	color: inherit;
`;
