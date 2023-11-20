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
			d="M2.57038 21.4288L19.6705 4.30481L18.387 3L13.5426 7.84444C12.7228 5.95713 10.9272 4.65004 8.85 4.65004C5.9265 4.65004 3.55 7.00504 3.55 9.90004C2.072 10.557 1 12.0795 1 13.65C1 15.4716 2.22409 17.0128 3.89282 17.4942L1.27502 20.112L2.57038 21.4288ZM8.28065 17.6693C10.0467 17.6761 11.9726 17.6765 12.5167 17.65L12.5491 17.6484H16.2491L16.25 17.65L19 17.65C21.209 17.65 23 15.859 23 13.65C23 11.441 21.209 9.65004 19 9.65004C18.4705 9.65004 17.9395 9.74654 17.45 9.95004C17.2205 9.69067 16.9639 9.46111 16.6866 9.26338L15.5938 10.3562C16.2523 10.7473 16.7731 11.3627 17 12.15C17.46 11.5365 18.2345 11.15 19 11.15C20.381 11.15 21.5 12.2695 21.5 13.65C21.5 15.0305 20.381 16.15 19 16.15H17.5V16.1487H10.1667V16.15H9.79992L8.28065 17.6693ZM12.3499 9.0371C11.9131 7.43722 10.564 6.15004 8.85 6.15004C6.749 6.15004 5.05 7.82854 5.05 9.90004C5.05 10.599 5.28105 11.2233 5.51841 11.8646L5.55 11.95L4.95 12.15L4.5 11.15C3.428 11.443 2.5 12.502 2.5 13.65C2.5 15.0325 3.601 16.15 5 16.15H5.23697L12.3499 9.0371Z"
		/>
	</svg>
);

export const SvgCrossedOutCloud = ({
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
				No wifi
			</span>
		) : (
			''
		)}
	</>
);
