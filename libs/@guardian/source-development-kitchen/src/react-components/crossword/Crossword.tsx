import { css } from '@emotion/react';
import { palette } from '@guardian/source/foundations';
import type { CAPICrossword } from './@types/CAPI';
import { CrosswordPlayer } from './vendor/mycrossword';

export type CrosswordProps = {
	data: CAPICrossword;
	theme?: {
		background?: string;
		grid?: string;
	};
};

const defaultTheme: CrosswordProps['theme'] = {
	background: palette.neutral[100],
	grid: palette.neutral[7],
};

export const Crossword = ({
	theme: userTheme,
	data,
	...props
}: CrosswordProps) => {
	const theme = { ...defaultTheme, ...userTheme };

	return (
		<div
			css={css`
				background-color: ${theme.background};
				border: ${theme.grid} solid 1px;
			`}
			{...props}
		>
			<CrosswordPlayer data={data} id={data.id} />
		</div>
	);
};
