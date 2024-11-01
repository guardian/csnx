// @ts-nocheck

import type { CellPosition, Char } from './index';

export default interface CellChange {
	pos: CellPosition;
	guess?: Char;
	previousGuess?: Char;
}
