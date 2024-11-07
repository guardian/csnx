import { css } from '@emotion/react';
import { isUndefined } from '@guardian/libs';
import { useCallback, useEffect, useState } from 'react';
import type { CAPICrossword } from '../@types/CAPI';
import type { Dimensions, Focus, Progress, Theme } from '../@types/crossword';
import { defaultTheme } from '../theme';
import { getCellsMap } from '../utils/getCells';
import { Grid } from './Grid';

export type CrosswordProps = {
	data: CAPICrossword;
	theme?: Partial<Theme>;
};

export const initialiseProgress = ({ rows, cols }: Dimensions): Progress => {
	return Array.from({ length: cols }, () =>
		Array.from({ length: rows }, () => ''),
	);
};

export const Crossword = ({ theme: userTheme, ...props }: CrosswordProps) => {
	const theme = { ...defaultTheme, ...userTheme };
	const cellsMap = getCellsMap(props.data);
	const [progress, setProgress] = useState<Progress>(
		initialiseProgress(props.data.dimensions),
	);
	const [focus, setFocus] = useState<Focus | undefined>({
		x: props.data.entries[0].position.x,
		y: props.data.entries[0].position.y,
		entryId: props.data.entries[0].id,
	});

	const updateFocus = useCallback(
		(dx: number, dy: number) => {
			if (!focus) {
				return;
			}
			const { x, y, entryId } = focus;
			const newX = x + dx;
			const newY = y + dy;
			const newCell = cellsMap.get(`x${newX}y${newY}`);
			if (!newCell) {
				return;
			}
			if (newCell.group) {
				const possibleAcross = newCell.group.find((group) =>
					group.includes('across'),
				);
				const possibleDown = newCell.group.find((group) =>
					group.includes('down'),
				);
				if (dy !== 0 && possibleDown) {
					if (entryId !== possibleDown) {
						setFocus({ x, y, entryId: possibleDown });
						return;
					}
					setFocus({ x: newX, y: newY, entryId: possibleDown });
					return;
				}
				if (dx !== 0 && possibleAcross) {
					if (entryId !== possibleAcross) {
						setFocus({ x, y, entryId: possibleAcross });
						return;
					}
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
			if (event.ctrlKey || event.altKey || event.metaKey) {
				return;
			}
			if (!focus) {
				return;
			}

			const direction = focus.entryId?.includes('across') ? 'across' : 'down';
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
						if (direction === 'across') {
							updateFocus(-1, 0);
						}
						if (direction === 'down') {
							updateFocus(0, -1);
						}
					}
					break;
				}
				default: {
					const upperCaseKey = key.toUpperCase();
					if (/^[A-Z]$/.test(upperCaseKey)) {
						updateProgress({ x: focus.x, y: focus.y, value: upperCaseKey });
						if (direction === 'across') {
							updateFocus(1, 0);
						}
						if (direction === 'down') {
							updateFocus(0, 1);
						}
					} else {
						preventDefault = false;
					}
					break;
				}
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
				setFocus={setFocus}
			/>
			{JSON.stringify(focus)}
		</div>
	);
};
