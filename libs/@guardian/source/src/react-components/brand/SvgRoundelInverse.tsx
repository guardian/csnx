import { neutral } from '../../foundations';
import { SvgRoundel } from './SvgRoundel';

export type SvgRoundelInverseProps = {
	/**
	 * The width the SVG will display at (height is automatically adjusted
	 * to maintain the correct aspect ratio).
	 */
	width?: number;
};

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/story/source_react-components-svgroundelinverse--default) •
 * [Design System](https://theguardian.design/2a1e5182b/p/8909e0-assets/t/37168b) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source/src/react-components/brand/SvgRoundelInverse.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source)
 */
export const SvgRoundelInverse = (args: SvgRoundelInverseProps) => {
	return (
		<SvgRoundel textColor={neutral[7]} backgroundColor="white" {...args} />
	);
};
