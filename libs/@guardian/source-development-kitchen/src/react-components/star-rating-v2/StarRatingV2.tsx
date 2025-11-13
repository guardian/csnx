import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import {
	neutral,
	brandAlt,
	visuallyHidden,
} from '@guardian/source/foundations';

type Size = 'large' | 'medium' | 'small';
type Use =
	| 'Default Card'
	| 'Feature Card'
	| 'Default Article'
	| 'Immersive Article';

const starSize = (size: Size) => {
	switch (size) {
		case 'small':
			return css`
				width: 18px;
				height: 18px;
			`;
		case 'medium':
			return css`
				width: 22px;
				height: 22px;
			`;
		case 'large':
			return css`
				width: 28px;
				height: 28px;
			`;
	}
};

const wrapperStyles = (size: Size) => css`
	display: flex;
	align-items: center;
	gap: ${size === 'small' ? '1px' : '2px'};
	padding: 0;
	margin: 0;
`;

const emptyCircleColour = (use: Use) => {
	switch (use) {
		case 'Default Card':
		case 'Default Article':
			return neutral[86];
		case 'Feature Card':
		case 'Immersive Article':
			return neutral[60];
	}
};

export interface StarRatingProps {
	rating: number;
	size: Size;
	use: Use;
	cssOverrides?: SerializedStyles | SerializedStyles[];
}

const FullStar = () => (
	<path d="M19.1513 21.3357L16.7329 13.9503L23 9.34749L22.6879 8.35931H14.9385L12.5461 0.999969H11.4539L9.08747 8.35931H1.31206L1 9.34749L7.26714 13.9503L4.90071 21.3357L5.70686 21.9598L12 17.3569L18.2931 21.9598L19.1513 21.3357Z" />
);

const EmptyStar = () => (
	<path
		fill="none"
		stroke={neutral[7]}
		strokeWidth="1.5"
		d="M14.3813 13.1959L18.2436 10.3593H13.4857L12.0074 5.81203L10.5452 10.3593H5.75638L9.61086 13.1902L8.17276 17.6783L12 14.8791L15.8561 17.6994L14.3813 13.1959Z"
	/>
);

export const StarRatingV2 = ({
	rating,
	size,
	use,
	cssOverrides,
	...props
}: StarRatingProps) => {
	const emptyBg = emptyCircleColour(use);

	return (
		<figure css={[wrapperStyles(size), cssOverrides]} {...props}>
			{Array.from({ length: 5 }, (_, i) => {
				const isFilled = i < rating;
				return (
					<svg
						key={i}
						css={starSize(size)}
						viewBox="0 0 24 24"
						aria-hidden="true"
						focusable="false"
					>
						<circle
							cx={12}
							cy={12}
							r={12}
							fill={isFilled ? brandAlt[400] : emptyBg}
						/>
						{isFilled ? <FullStar /> : <EmptyStar />}
					</svg>
				);
			})}

			<figcaption
				css={css`
					${visuallyHidden}
				`}
			>
				{rating} star{rating !== 1 && 's'} out of 5
			</figcaption>
		</figure>
	);
};
