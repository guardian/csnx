import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { neutral } from '@guardian/source-foundations';
import { SvgRoundel } from './SvgRoundel';

export type SvgRoundelInverseProps = {
	/**
	 * The width the SVG will display at (height is automatically adjusted
	 * to maintain the correct aspect ratio).
	 */
	width?: number;
};

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components_svgroundelinverse--default) •
 * [Design System](https://theguardian.design/2a1e5182b/p/8909e0-assets/t/37168b) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-react-components/src/brand/SvgRoundelInverse.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-react-components)
 */
export const SvgRoundelInverse = (
	args: SvgRoundelInverseProps,
): EmotionJSX.Element => {
	return (
		<SvgRoundel textColor={neutral[7]} backgroundColor="white" {...args} />
	);
};
