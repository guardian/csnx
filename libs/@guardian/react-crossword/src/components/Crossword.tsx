import { css } from '@emotion/react';
import type { CAPICrossword } from '../@types/CAPI';
import { Dimensions, Focus, Progress, Theme } from '../@types/crossword';
import { defaultTheme } from '../theme';
import { useCallback, useEffect, useState } from 'react';
import { getCellsMap } from '../utils/getCells';
import { isUndefined } from '@guardian/libs';
import { Grid } from './Grid';

export type CrosswordProps = {
	data: CAPICrossword;
	theme?: Partial<Theme>;
};

export const initialiseProgress = ({ rows, cols }: Dimensions): Progress => {
	return Array.from({ length: cols }, () => Array(rows).fill(''));
};

export const Crossword = ({ theme: userTheme, ...props }: CrosswordProps) => {
	const theme = { ...defaultTheme, ...userTheme };
	const cellsMap = getCellsMap(props.data);
	const [progress, setProgress] = useState<Progress>(
		initialiseProgress(props.data.dimensions),
	);
	const [focus, setFocus] = useState<Focus>({
		x: props.data.entries[0].position.x,
		y: props.data.entries[0].position.y,
		entryId: props.data.entries[0].id,
	});

	const updateFocus = useCallback(
		(dx: number, dy: number) => {
			if (!focus) return;
			const { x, y } = focus;
			const newX = x + dx;
			const newY = y + dy;
			const newCell = cellsMap.get(`x${newX}y${newY}`);
			if (!newCell) return;
			if (newCell.group) {
				const possibleAcross = newCell.group.find((group) =>
					group.includes('across'),
				);
				const possibleDown = newCell.group.find((group) =>
					group.includes('down'),
				);
				if (dy !== 0 && possibleDown) {
					setFocus({ x: newX, y: newY, entryId: possibleDown });
					return;
				}
				if (dx !== 0 && possibleAcross) {
					setFocus({ x: newX, y: newY, entryId: possibleAcross });
					return;
				}
			}
		},
		[focus, cellsMap],
	);

	const handleTab = useCallback(() => {
		return;
	}, []);

	const updateProgress = useCallback(
		({ x, y, value }: { x: number; y: number; value: string }) => {
			setProgress((prevProgress) => {
				const updatedProgress = [...prevProgress];
				if (
					!isUndefined(updatedProgress[x]) &&
					!isUndefined(updatedProgress[x][y])
				) {
					updatedProgress[x][y] = value;
				}
				return updatedProgress;
			});
		},
		[],
	);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent): void => {
			if (event.ctrlKey || event.altKey || event.metaKey) return;
			if (!focus) return;

			let direction = focus.entryId?.includes('across') ? 'across' : 'down';
			let preventDefault = true;
			const { key } = event;

			switch (key) {
				case 'ArrowUp':
					updateFocus(0, -1);
					break;
				case 'ArrowDown':
					updateFocus(0, 1);
					break;
				case 'ArrowLeft':
					updateFocus(-1, 0);
					break;
				case 'ArrowRight':
					updateFocus(1, 0);
					break;
				case ' ':
				case 'Tab':
					handleTab();
					break;
				case 'Backspace':
				case 'Delete': {
					updateProgress({ x: focus.x, y: focus.y, value: '' });
					if (key === 'Backspace') {
						if (direction === 'across') updateFocus(-1, 0);
						if (direction === 'down') updateFocus(0, -1);
					}
					break;
				}
				default:
					if (key.length === 1) {
						updateProgress({ x: focus.x, y: focus.y, value: key });
						if (direction === 'across') updateFocus(1, 0);
						if (direction === 'down') updateFocus(0, 1);
					} else {
						preventDefault = false;
					}
					break;
			}

			if (preventDefault) {
				event.preventDefault();
			}
		},
		[focus, updateFocus, updateProgress, handleTab],
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

	return (
		<div
			css={css`
				background-color: ${theme.foreground};
				border: ${theme.text} solid 1px;
			`}
			{...props}
		>
			<Grid
				cellsMap={cellsMap}
				theme={defaultTheme}
				progress={progress}
				focus={focus}
				rows={props.data.dimensions.rows}
				cols={props.data.dimensions.cols}
			/>
			{JSON.stringify(focus)}
		</div>
	);
};
