import type { SerializedStyles } from '@emotion/react';
import { neutral } from '@guardian/source/foundations';
import { DashedLines } from './DashedLines';
import { DottedLines } from './DottedLines';
import { SquigglyLines } from './SquigglyLines';
import { StraightLines } from './StraightLines';

type LineEffectType = 'squiggly' | 'dotted' | 'straight' | 'dashed';

export type LineCount = 1 | 4 | 8;

export interface LinesProps {
	/**
	 * The appearance of the lines
	 */
	effect?: LineEffectType;
	/**
	 * How many lines appear
	 */
	count?: LineCount;
	/**
	 * The colour of the lines
	 */
	color?: string;
	cssOverrides?: SerializedStyles | SerializedStyles[];
}

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/story/source-development-kitchen_react-components-lines--default-lines) •
 * [Design System](https://theguardian.design) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-development-kitchen/src/lines/Lines.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-development-kitchen)
 *
 * @deprecated prefer using the right line type component directly:
 * - `StraightLines`
 * - `SquigglyLines`
 * - `DottedLines`
 * - `DashedLines`
 */
export const Lines = ({
	effect = 'straight',
	count = 4,
	color = neutral[86],
	cssOverrides,
}: LinesProps) => {
	switch (effect) {
		case 'squiggly':
			return (
				<SquigglyLines
					count={count}
					color={color}
					cssOverrides={cssOverrides}
				/>
			);
		case 'dotted':
			return (
				<DottedLines count={count} color={color} cssOverrides={cssOverrides} />
			);
		case 'dashed':
			return (
				<DashedLines count={count} color={color} cssOverrides={cssOverrides} />
			);
		case 'straight':
		default:
			return (
				<StraightLines
					count={count}
					color={color}
					cssOverrides={cssOverrides}
				/>
			);
	}
};
