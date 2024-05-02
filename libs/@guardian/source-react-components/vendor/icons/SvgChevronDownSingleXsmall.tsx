// DO NOT EDIT
// this file is auto-generated by packages/@guardian/source-react-components/scripts/create-icons/index.ts
import { css } from '@emotion/react';
import type { JSX } from '@emotion/react/jsx-runtime';
import { iconSize, visuallyHidden } from '@guardian/source-foundations';
import type { IconProps } from '../../src';

const Svg = ({ size, theme }: IconProps): JSX.Element => (
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
			d="M7.806 10.712 11.634 15h.731l3.829-4.288L15.5 10 12 13l-3.5-3-.694.712Z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgChevronDownSingleXsmall = ({
	size,
	theme,
	isAnnouncedByScreenReader = false,
}: IconProps): JSX.Element => (
	<>
		<Svg size={size} theme={theme} />
		{isAnnouncedByScreenReader ? (
			<span
				css={css`
					${visuallyHidden}
				`}
			>
				Expand to show more
			</span>
		) : (
			''
		)}
	</>
);
