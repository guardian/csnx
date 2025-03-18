// DO NOT EDIT
// this file is auto-generated by libs/@guardian/source/scripts/create-icons/index.ts
import { css } from '@emotion/react';
import type { IconProps } from '../..';
import { iconSize, visuallyHidden } from '../../../foundations';

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
			d="M5.423 4 3.944 5.48l.209 1.398h-.655L2 8.378 4.034 18.73l1.914 1.279h12.024l1.915-1.28L22 8.378l-1.498-1.499h-.635l.189-1.409L18.577 4zm14.424 4.477.427.42-1.806 8.854-.972.65H6.425l-.963-.64-1.736-8.854.427-.43zM18.26 6.878l.109-.83-.446-.449H6.077l-.446.44.119.84zM7.506 10.246l.298 1.6h8.323l.298-1.6zm.962 3.028.298 1.6h6.399l.297-1.6z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgNewspaperArchive = ({
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
				Newspaper archive
			</span>
		) : (
			''
		)}
	</>
);
