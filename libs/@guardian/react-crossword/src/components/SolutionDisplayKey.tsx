import { css } from '@emotion/react';
import { Cell } from './SolutionDisplayCell';

export const SolutionDisplayKey = () => {
	return (
		<div
			css={css`
				display: grid;
				grid-template-columns: auto 1fr;
				* {
					margin-bottom: 10px;
					margin-right: 10px;
				}
			`}
		>
			<div>Unsaved value</div>
			<Cell
				progressLetter={{
					progress: '',
					coords: { x: 0, y: 0 },
					isSaved: false,
				}}
				progressValid={false}
			/>
			<div>Mismatched value</div>
			<Cell
				progressLetter={{
					progress: 'T',
					coords: { x: 0, y: 0 },
					isSaved: true,
				}}
				progressValid={false}
			/>
		</div>
	);
};
