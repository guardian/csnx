import { useTheme } from '../context/Theme';
import { useGridWidth } from './useGridWidth';

export const useWidthForCols = (cols: number) => {
	const gridWidth = useGridWidth();
	const { clueMinWidth } = useTheme();

	return gridWidth + clueMinWidth * cols + 'px';
};
