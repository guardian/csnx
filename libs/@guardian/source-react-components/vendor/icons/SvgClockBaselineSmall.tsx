// DO NOT EDIT
// this file is auto-generated by packages/@guardian/source-react-components/scripts/create-icons/index.ts
import { css } from '@emotion/react';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { iconSize, visuallyHidden } from '@guardian/source-foundations';
import type { IconProps } from '../../src/@types/Icons';

const Svg = ({ size }: IconProps): EmotionJSX.Element => (
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
			d="M11.975 4C16.95 4 20.9999 8.04999 20.9999 13.025C20.9999 18 16.95 22.0249 11.975 22.0249C6.99999 22.0249 3 18 3 13.025C3 8.04999 6.99999 4 11.975 4ZM11.375 5.64999L10.75 13.325L12 14.375L18.3499 13.85V12.625L13.15 12.325L12.6 5.64999H11.375Z"
		/>
	</svg>
);

export const SvgClockBaselineSmall = ({
	size,
	isAnnouncedByScreenReader = false,
}: IconProps): EmotionJSX.Element => (
	<>
		<Svg size={size} />
		{isAnnouncedByScreenReader ? (
			<span
				css={css`
					${visuallyHidden}
				`}
			>
				Clock
			</span>
		) : (
			''
		)}
	</>
);
