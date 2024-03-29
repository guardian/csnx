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
			d="m13.345 17.69 1.475-.325-1-3.1H9.495l-1.05 3.1 1.525.325v.775h-4.1v-.775l1.3-.325L11.295 5.54h1.55l4 11.825 1.275.325v.775h-4.775v-.775ZM9.82 13.315h3.7l-1.75-5.45h-.1l-1.85 5.45Z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgTextSmall = ({
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
				Small text
			</span>
		) : (
			''
		)}
	</>
);
