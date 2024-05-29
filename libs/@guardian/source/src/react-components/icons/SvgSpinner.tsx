import { iconSize } from '../../foundations';
import type { IconSize } from '../@types/Icons';
import { ThemeSpinnerIcon, themeSpinnerIcon } from './theme';

interface SpinnerIconProps {
	size?: IconSize;
	theme?: Partial<ThemeSpinnerIcon>;
}

export const SvgSpinner = ({ size, theme }: SpinnerIconProps) => {
	const mergedTheme = { ...themeSpinnerIcon, ...theme };

	return (
		<svg
			width={size ? iconSize[size] : undefined}
			viewBox="0 0 30 30"
			focusable={false}
			aria-hidden={true}
		>
			<g>
				<animateTransform
					attributeName="transform"
					attributeType="XML"
					type="rotate"
					from="0 15 15"
					to="360 15 15"
					dur="2.5s"
					repeatCount="indefinite"
				/>
				<circle
					cx="15"
					cy="15"
					r="12.5"
					stroke-width="5"
					stroke={mergedTheme.strokeBackground}
					fill={mergedTheme.fillBackground}
				/>
				<circle
					cx="15"
					cy="15"
					r="12.5"
					stroke-width="5"
					stroke-dasharray="82"
					stroke-dashoffset="82"
					stroke={mergedTheme.strokeForeground}
					fill={mergedTheme.fillForeground}
				>
					<animate
						attributeName="stroke-dashoffset"
						dur="3.5s"
						to="-82"
						repeatCount="indefinite"
					/>
				</circle>
			</g>
		</svg>
	);
};
