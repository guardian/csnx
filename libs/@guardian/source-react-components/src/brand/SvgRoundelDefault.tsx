import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { neutral } from '@guardian/source-foundations';
import { SvgRoundel } from './SvgRoundel';

export type SvgRoundelDefaultProps = {
	/**
	 * The width the SVG will display at (height is automatically adjusted
	 * to maintain the correct aspect ratio).
	 */
	width?: number;
};

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components_svgroundeldefault--default) •
 * [Design System](https://theguardian.design/2a1e5182b/p/8909e0-assets/t/37168b) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-react-components/src/brand/SvgRoundelDefault.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-react-components)
 */
export const SvgRoundelDefault = (
	args: SvgRoundelDefaultProps,
): EmotionJSX.Element => {
	return (
		<SvgRoundel textColor="white" backgroundColor={neutral[7]} {...args} />
	);
};
