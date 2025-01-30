import type { ComponentType } from 'react';
import type { AnagramHelper } from '../components/AnagramHelper';
import type { Clues } from '../components/Clues';
import type { Controls } from '../components/Controls';
import type { Grid } from '../components/Grid';
import type { StickyClue } from '../components/StickyClue';

export type LayoutProps = {
	Grid: typeof Grid;
	Controls: typeof Controls;
	AnagramHelper: typeof AnagramHelper;
	StickyClue: typeof StickyClue;
	Clues: typeof Clues;
	SavedMessage: ComponentType;
	gridWidth: number;
};
