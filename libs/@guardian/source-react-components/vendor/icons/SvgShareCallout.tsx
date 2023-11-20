// DO NOT EDIT
// this file is auto-generated by packages/@guardian/source-react-components/scripts/create-icons/index.ts
import { css } from '@emotion/react';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { iconSize, visuallyHidden } from '@guardian/source-foundations';
import type { IconProps } from '../../src/@types/Icons';

const Svg = ({ size }: IconProps): EmotionJSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size ? iconSize[size] : undefined}
		height={undefined}
		viewBox="-3 -3 30 30"
		focusable={false}
		aria-hidden={true}
	>
		<path
			fillRule="evenodd"
			d="m8.051 11.563 4.917-7.333 1.667 1.105-4.917 7.333-1.667-1.105Z"
			clipRule="evenodd"
		/>
		<path
			fillRule="evenodd"
			d="m10.182 11.614 8.825-.835.19 1.991-8.824.834-.19-1.99ZM9.266 13.337l6.26 6.24-1.42 1.409-6.26-6.24 1.42-1.409Z"
			clipRule="evenodd"
		/>
		<path d="M21.9 11.472a2.76 2.76 0 0 1-2.769 2.75 2.76 2.76 0 0 1-2.769-2.75 2.76 2.76 0 0 1 2.77-2.75 2.76 2.76 0 0 1 2.769 2.75Z" />
		<path
			fillRule="evenodd"
			d="M19.131 9.722a1.76 1.76 0 0 0-1.769 1.75c0 .958.784 1.75 1.77 1.75a1.76 1.76 0 0 0 1.769-1.75 1.76 1.76 0 0 0-1.77-1.75Zm-3.769 1.75c0-2.073 1.69-3.75 3.77-3.75S22.9 9.4 22.9 11.472s-1.69 3.75-3.77 3.75-3.769-1.677-3.769-3.75Z"
			clipRule="evenodd"
		/>
		<path d="M12.681 13c0 3.034-2.474 5.5-5.535 5.5-3.06 0-5.535-2.466-5.535-5.5s2.475-5.5 5.535-5.5 5.535 2.466 5.535 5.5Z" />
		<path
			fillRule="evenodd"
			d="M7.146 8.5c-2.513 0-4.535 2.023-4.535 4.5s2.022 4.5 4.535 4.5c2.513 0 4.535-2.023 4.535-4.5S9.66 8.5 7.146 8.5ZM.611 13c0-3.592 2.928-6.5 6.535-6.5 3.608 0 6.535 2.908 6.535 6.5s-2.927 6.5-6.535 6.5C3.54 19.5.611 16.592.611 13Z"
			clipRule="evenodd"
		/>
		<path d="M16.369 19.722a1.84 1.84 0 0 1-1.847 1.833 1.84 1.84 0 0 1-1.848-1.833 1.84 1.84 0 0 1 1.848-1.833 1.84 1.84 0 0 1 1.847 1.833Z" />
		<path
			fillRule="evenodd"
			d="M14.522 18.889a.84.84 0 0 0-.848.833.84.84 0 0 0 .848.833.84.84 0 0 0 .847-.833.84.84 0 0 0-.847-.833Zm-2.848.833a2.84 2.84 0 0 1 2.848-2.833 2.84 2.84 0 0 1 2.847 2.833 2.84 2.84 0 0 1-2.847 2.833 2.84 2.84 0 0 1-2.848-2.833Z"
			clipRule="evenodd"
		/>
		<path d="M15.754 4.444a1.84 1.84 0 0 1-1.847 1.834 1.84 1.84 0 0 1-1.847-1.834 1.84 1.84 0 0 1 1.847-1.833 1.84 1.84 0 0 1 1.847 1.833Z" />
		<path
			fillRule="evenodd"
			d="M13.907 3.611a.84.84 0 0 0-.847.833.84.84 0 0 0 .847.834.84.84 0 0 0 .847-.834.84.84 0 0 0-.847-.833Zm-2.847.833a2.84 2.84 0 0 1 2.847-2.833 2.84 2.84 0 0 1 2.847 2.833 2.84 2.84 0 0 1-2.847 2.834 2.84 2.84 0 0 1-2.847-2.834Z"
			clipRule="evenodd"
		/>
	</svg>
);

export const SvgShareCallout = ({
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
				Share callout
			</span>
		) : (
			''
		)}
	</>
);
