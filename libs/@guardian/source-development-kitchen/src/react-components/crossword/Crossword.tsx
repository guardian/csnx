import { css } from '@emotion/react';
import type { CAPICrossword } from './@types/CAPI';
import { Theme } from './@types/crossword';
import { defaultTheme } from './theme';
// import { initialiseCells } from "./components/grid";
// import { useState } from "react";

export type CrosswordProps = {
	data: CAPICrossword;
	theme?: Partial<Theme>;
};

export const Crossword = ({
	theme: userTheme,
	data,
	...props
}: CrosswordProps) => {
	const theme = { ...defaultTheme, ...userTheme };
	// const cells = initialiseCells(data)
	// const [progress, setProgress] = useState()
	// const [focus, setFocus] = useState()

	return (
		<div
			css={css`
				background-color: ${theme.background};
				border: ${theme.text} solid 1px;
			`}
			{...props}
		></div>
	);
};
