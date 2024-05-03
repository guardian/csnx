// DO NOT EDIT
// this file is auto-generated by packages/@guardian/source-react-components/scripts/create-icons/index.ts
import { css } from '@emotion/react';
import { iconSize, visuallyHidden } from '@guardian/source-foundations';
import type { IconProps } from '../../src';

const Svg = ({ size, theme }: IconProps) => (
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
			d="m12.488 12.383 9.936 6.633.576-.426V5.425L22.424 5l-9.936 6.633v.75ZM1 12.383l9.961 6.633.55-.426V5.425L10.962 5 1 11.633v.75Z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgMediaControlsBack = ({
	size,
	theme,
	isAnnouncedByScreenReader = false,
}: IconProps) => (
	<>
		<Svg size={size} theme={theme} />
		{isAnnouncedByScreenReader ? (
			<span
				css={css`
					${visuallyHidden}
				`}
			>
				Rewind
			</span>
		) : (
			''
		)}
	</>
);
