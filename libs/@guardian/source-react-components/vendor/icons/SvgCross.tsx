// DO NOT EDIT
// this file is auto-generated by packages/@guardian/source-react-components/scripts/create-icons/index.ts
import { css } from '@emotion/react';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { iconSize, visuallyHidden } from '@guardian/source-foundations';
import type { IconProps } from '../../src';

const Svg = ({ size, theme }: IconProps): EmotionJSX.Element => (
	<svg
		width={size ? iconSize[size] : undefined}
		height={undefined}
		viewBox="-3 -3 30 30"
		xmlns="http://www.w3.org/2000/svg"
		focusable={false}
		aria-hidden={true}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M12.015 14.042 20.707 22 22 20.709 14.06 12 22 3.291 20.707 2l-8.692 7.958L3.293 2.03 2 3.321 9.97 12 2 20.679l1.293 1.291 8.722-7.928Z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgCross = ({
	size,
	theme,
	isAnnouncedByScreenReader = false,
}: IconProps): EmotionJSX.Element => (
	<>
		<Svg size={size} theme={theme} />
		{isAnnouncedByScreenReader ? (
			<span
				css={css`
					${visuallyHidden}
				`}
			>
				Close
			</span>
		) : (
			''
		)}
	</>
);
