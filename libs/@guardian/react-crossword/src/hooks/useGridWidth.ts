import { useMemo } from 'react';
import { useData } from '../context/Data';
import { useTheme } from '../context/Theme';

export const useGridWidth = () => {
	const { gutter, cellSize } = useTheme();
	const { dimensions } = useData();

	return useMemo(
		() => Math.max((cellSize + gutter) * dimensions.cols + gutter, 300),
		[cellSize, gutter, dimensions.cols],
	);
};
