import { memo, useState } from 'react';
import { AnagramHelper } from './AnagramHelper';
import { Controls } from './Controls';
import { Grid } from './Grid';

export const InteractiveGrid = memo(() => {
	const [showAnagramHelper, setShowAnagramHelper] = useState(false);

	const toggleAnagramHelper = () =>
		setShowAnagramHelper((prevState) => !prevState);

	return (
		<>
			{showAnagramHelper ? (
				<AnagramHelper hideAnagramHelper={() => setShowAnagramHelper(false)} />
			) : (
				<Grid />
			)}
			<Controls toggleAnagramHelper={toggleAnagramHelper} />
		</>
	);
});
