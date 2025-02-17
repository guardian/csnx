import type { ComponentType } from 'react';
import type { AnagramHelper } from '../components/AnagramHelper';
import type { Clues } from '../components/Clues';
import type { Controls } from '../components/Controls';
import type { Grid } from '../components/Grid';
import type { FocusedClue } from '../components/FocusedClue';

export type LayoutProps = {
	Grid: typeof Grid;
	Controls: typeof Controls;
	AnagramHelper: typeof AnagramHelper;
	FocusedClue: typeof FocusedClue;
	Clues: typeof Clues;
	SavedMessage: ComponentType;
	gridWidth: number;
};
