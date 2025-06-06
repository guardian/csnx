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
			d="M6.48 2h11.01l.71.71v4.97h2.37l1.44 1.6-.01.01v3.14l-.02 7.48v.66l-.46.47-.48.49-.47.47h-.66l-15.79.02h-.66l-.47-.46-.52-.51-.47-.47V9.28l.007.003L3.42 7.68h2.36V2.71zm-.7 7.28H4.14l-.54.609v1.391l2.18 1.385zm1.3 4.211 4.61 2.929h.54l4.67-2.95V3.3H7.08zm11.12-.841 2.2-1.39V9.876l-.54-.596H18.2zm-2.77-7.61H8.56v1h6.87zm4.98 7.4v7.48l-.5.49-15.79.02-.52-.51v-7.47l7.57 5.59h1.59l7.64-5.6zM8.56 10.32h6.87v1H8.56zm6.87-2.64H8.56v1h6.87z"
			fill={theme?.fill}
		/>
	</svg>
);

export const SvgNewsletterOutlined = ({
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
				Newsletter
			</span>
		) : (
			''
		)}
	</>
);
