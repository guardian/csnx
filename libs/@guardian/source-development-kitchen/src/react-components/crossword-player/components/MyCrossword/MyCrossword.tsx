import { css } from '@emotion/react';
import type { FC } from 'react';
import { Crossword } from '../../components';
import { GameProvider } from '../../context/GameProvider';
import { DEFAULT_CELL_MATCHER, DEFAULT_HTML_TAGS } from '../../utils/general';
import type {
	CellChange,
	CellFocus,
	GuardianCrossword,
	GuessGrid,
} from './../../interfaces';

export interface CrosswordPlayerProps {
	allowedHtmlTags?: string[];
	allowMissingSolutions?: boolean;
	cellMatcher?: RegExp;
	className?: string;
	data: GuardianCrossword;
	id: string;
	loadGrid?: GuessGrid;
	onCellChange?: (cellChange: CellChange) => void;
	onCellFocus?: (cellFocus: CellFocus) => void;
	saveGrid?: (value: GuessGrid | ((val: GuessGrid) => GuessGrid)) => void;
	stickyClue?: 'always' | 'never' | 'auto';
}

// Define the Emotion CSS styles
const gridSize = 10;
const fontFamily = `'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif`;
const fontSize = 14;
const scrollbarTrackBackground = '#f1f1f1';
const scrollbarThumbBackground = '#c1c1c1';
const scrollbarThumbHover = '#a8a8a8';

const myCrosswordStyle = css`
	font-family: ${fontFamily};
	font-size: ${fontSize}px;
	-webkit-font-smoothing: subpixel-antialiased;
	box-sizing: content-box;

	sup,
	sub {
		vertical-align: baseline;
		position: relative;
		top: -0.4em;
	}

	sub {
		top: 0.4em;
	}

	::-webkit-scrollbar {
		width: ${gridSize * 0.9}px;
	}

	::-webkit-scrollbar-track {
		background: ${scrollbarTrackBackground};
	}

	::-webkit-scrollbar-thumb {
		background-color: ${scrollbarThumbBackground};

		&:hover {
			background-color: ${scrollbarThumbHover};
		}
	}
`;

export const MyCrossword: FC<CrosswordPlayerProps> = ({
	allowedHtmlTags = DEFAULT_HTML_TAGS,
	allowMissingSolutions = false,
	cellMatcher = DEFAULT_CELL_MATCHER,
	className,
	data,
	id,
	loadGrid,
	onCellChange,
	onCellFocus,
	saveGrid,
	stickyClue = 'auto',
}: CrosswordPlayerProps) => {
	return (
		<>
			<GameProvider>
				<div css={[myCrosswordStyle]} className={className}>
					<Crossword
						allowedHtmlTags={allowedHtmlTags}
						allowMissingSolutions={allowMissingSolutions}
						cellMatcher={cellMatcher}
						data={data}
						id={id}
						loadGrid={loadGrid}
						onCellChange={onCellChange}
						onCellFocus={onCellFocus}
						saveGrid={saveGrid}
						stickyClue={stickyClue}
					/>
				</div>
			</GameProvider>
		</>
	);
};
