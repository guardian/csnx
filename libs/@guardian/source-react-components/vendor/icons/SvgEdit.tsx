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
			d="M18.404 1 4.397 15.2l2.121 2.149 2.122 2.15L20.759 7.215l-4.24-4.298.73-.74 4.24 4.298 1.187-1.204L18.405 1Zm-3.622 5.71-9.38 9.507.67.679 9.38-9.506-.67-.68ZM3.69 15.915 2.63 16.992 2 21.369l.554.561 4.32-.639 1.058-1.077-4.243-4.3Z"
		/>
	</svg>
);

export const SvgEdit = ({
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
				Edit
			</span>
		) : (
			''
		)}
	</>
);