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
			d="m9.407 2.05.983 12.848h2.712l1.017-12.847L13.136 1H10.39l-.983 1.05Zm5.017 18.272c0-1.491-1.22-2.712-2.746-2.712C10.22 17.61 9 18.83 9 20.322 9 21.78 10.22 23 11.678 23c1.491 0 2.746-1.22 2.746-2.678Z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgExclamation = ({
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
				Exclamation mark
			</span>
		) : (
			''
		)}
	</>
);
