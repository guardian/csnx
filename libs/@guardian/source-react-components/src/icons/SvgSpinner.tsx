import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { iconSize, palette } from '@guardian/source-foundations';
import type { IconProps } from '../@types/Icons';

interface LoadingCircleIconProps extends IconProps {
	additionalCss?: SerializedStyles;
}

const circleLineThickness = 5;

const backgroundCircleStyles = css`
	stroke: ${palette.brand[800]};
	stroke-width: ${circleLineThickness};
	fill: transparent;
`;

const foregroundCircleStyles = css`
	stroke: ${palette.brand[400]};
	stroke-dasharray: 82;
	stroke-dashoffset: 82;
	stroke-width: ${circleLineThickness};
	fill: transparent;
`;

export const SvgSpinner = ({ size }: LoadingCircleIconProps) => {
	return (
		<svg width={size ? iconSize[size] : undefined} viewBox="0 0 30 30">
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
				<circle cx="15" cy="15" r="12.6" css={backgroundCircleStyles} />
				<circle cx="15" cy="15" r="12.6" css={foregroundCircleStyles}>
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
