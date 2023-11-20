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
			d="M18.9999 20.9999H5L4 19.9999V9.37497L11.4 2H12.6L19.9999 9.37497V19.9999L18.9999 20.9999ZM17.925 14.475C17.95 14.1 18 13.825 18 13.525C18 13.15 17.95 12.9 17.925 12.525L16.7 12.25C16.625 11.775 16.45 11.4 16.225 11L16.875 9.94997C16.475 9.44998 16.05 8.99998 15.525 8.62498L14.5 9.27498C14.1 9.04998 13.675 8.87498 13.2 8.79998L12.975 7.57498C12.625 7.52498 12.3 7.49998 11.975 7.49998C11.7 7.49998 11.375 7.52498 11.025 7.57498L10.8 8.79998C10.325 8.87498 9.89998 9.04998 9.49998 9.27498L8.49998 8.62498C7.92499 8.99998 7.52499 9.44998 7.12499 9.94997L7.77499 11C7.52499 11.425 7.37499 11.85 7.29999 12.25L6.07499 12.525C6.04999 12.9 5.99999 13.15 5.99999 13.525C5.99999 13.825 6.04999 14.1 6.07499 14.475L7.29999 14.675C7.37499 15.175 7.54999 15.525 7.77499 16L7.12499 16.9749C7.49999 17.4999 7.97499 17.9749 8.49998 18.3749L9.49998 17.7249C9.87498 17.9499 10.325 18.0999 10.8 18.1999L11.025 19.4249C11.4 19.4499 11.675 19.4999 11.975 19.4999C12.35 19.4999 12.6 19.4499 12.975 19.4249L13.2 18.1999C13.675 18.0999 14.125 17.9499 14.5 17.7249L15.525 18.3749C16.05 17.9749 16.475 17.5499 16.875 16.9749L16.225 16C16.45 15.6 16.625 15.175 16.7 14.675L17.925 14.475ZM11.975 16.375C10.375 16.375 9.12498 15.025 9.12498 13.525C9.12498 11.875 10.375 10.625 11.975 10.625C13.65 10.625 14.875 11.85 14.875 13.525C14.875 15.025 13.625 16.375 11.975 16.375Z"
		/>
	</svg>
);

export const SvgHouseSetting = ({
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
				Settings
			</span>
		) : (
			''
		)}
	</>
);
