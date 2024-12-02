import { memo } from 'react';
import { Controls } from './Controls';
import { Grid } from './Grid';

export const InteractiveGrid = memo(() => {
	return (
		<>
			<Grid />
			<Controls.Clues />
			<Controls.Grid />
		</>
	);
});
