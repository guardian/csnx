import { brand } from '../../foundations';
import { SvgRoundel } from './SvgRoundel';

export type SvgRoundelBrandInverseProps = {
	/**
	 * The width the SVG will display at (height is automatically adjusted
	 * to maintain the correct aspect ratio).
	 */
	width?: number;
};

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/story/source_react-components-svgroundelbrandinverse--default) •
 * [Design System](https://theguardian.design/2a1e5182b/p/8909e0-assets/t/37168b) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source/src/react-components/brand/SvgRoundelBrandInverse.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source)
 */
export const SvgRoundelBrandInverse = (args: SvgRoundelBrandInverseProps) => {
	return (
		<SvgRoundel textColor={brand[400]} backgroundColor="white" {...args} />
	);
};
