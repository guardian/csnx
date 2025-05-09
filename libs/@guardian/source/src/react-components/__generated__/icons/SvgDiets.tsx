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
			d="M17.212 2.744c-2.128 1.724-4.02 2.187-5.927 2.655q-.44.106-.88.22c-3.185.827-5.333 2.711-6.216 5.2-.837 2.357-.488 5.116.963 7.796q-.361.594-.69 1.151l1.399.827q.272-.462.564-.945h4.736c2.186 0 3.965-.59 5.334-1.638 1.366-1.045 2.266-2.501 2.773-4.14 1.008-3.253.502-7.31-1.062-10.767zm-5.564 4.24q-.429.104-.835.207c-2.758.717-4.42 2.277-5.092 4.171-.573 1.613-.466 3.58.453 5.652 1.467-2.188 3.675-4.42 6.69-6.795l.688.812c-2.906 2.594-4.684 4.867-6.098 6.992h3.707c1.883 0 3.301-.503 4.347-1.303 1.05-.804 1.78-1.95 2.208-3.33.771-2.489.526-5.662-.565-8.587-2.011 1.332-3.871 1.784-5.503 2.181"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgDiets = ({
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
				Diets
			</span>
		) : (
			''
		)}
	</>
);
