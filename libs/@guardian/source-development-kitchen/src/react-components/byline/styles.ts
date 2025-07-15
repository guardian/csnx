import { css } from '@emotion/react';
import { textSans14 } from '@guardian/source/foundations';
import type { Node } from 'prosemirror-model';

export const bylineContainerStyles = css`
	position: relative;
	width: 100%;

	${textSans14};
`;

export const bylineEditorStyles = css`
	border: 1px solid black;
	padding: 8px;
	color: #2b2b29;

	.ProseMirror:focus {
		outline: none;
	}

	chip {
		border: 2px solid lightgrey;
		border-radius: 8px;
		padding: 2px 4px;

		cursor: default;

		&[data-type='tagged'] {
			background-color: lightgrey;
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
`;

export const dropdownContainerStyles = (showDropdown: boolean) => css`
	position: absolute;
	box-sizing: border-box;
	width: 100%;
	z-index: 1000;
	border: 1px solid #ccc;
	background-color: rgba(255, 255, 255, 0.8);
	display: ${showDropdown ? 'block' : 'none'};
`;

export const dropdownUlStyles = css`
	margin: 0;
	padding: 0;
	list-style-type: none;
`;

export const dropdownLiStyles = css`
	cursor: pointer;
	padding: 5px;
	border-bottom: 1px solid #ccc;
`;

export const selectedDropdownLiStyles = css`
	background-color: cadetblue;
	color: white;
`;

export const previewFreeTextStyles = css`
	font-style: italic;
`;

export const previewContributorStyles = (node: Node) => css`
	${node.attrs.type === 'tagged' ? 'text-decoration: underline;' : ''}
`;
