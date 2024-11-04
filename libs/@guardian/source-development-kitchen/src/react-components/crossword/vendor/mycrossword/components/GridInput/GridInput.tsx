// @ts-nocheck

import { css } from '@emotion/react';
import * as React from 'react';

interface GridInputProps {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	visible: boolean;
}

const fontSizeLarge = 16;

const gridInputStyle = css`
	width: 100%;
	height: 100%;
	background-color: transparent;
	border: 0;
	padding: 0;
	text-align: center;
	font-size: ${fontSizeLarge * 1.3}px;
	overflow: hidden;
	caret-color: #fff;
`;

const inclusivelyHiddenStyle = css`
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	overflow: hidden;
	position: absolute;
	white-space: nowrap;
	width: 1px;
`;

const GridInput = React.forwardRef<HTMLInputElement, GridInputProps>(
	({ onChange, onKeyDown, visible }, ref) => {
		return (
			<input
				autoComplete="off"
				autoCorrect="off"
				autoFocus={false}
				css={[gridInputStyle, !visible && inclusivelyHiddenStyle]}
				maxLength={1}
				onChange={onChange}
				onKeyDown={onKeyDown}
				ref={ref}
				spellCheck="false"
				tabIndex={-1}
				type="text"
				value=""
			/>
		);
	},
);

export default GridInput;
