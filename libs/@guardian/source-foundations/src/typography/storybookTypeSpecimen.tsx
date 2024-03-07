import { css } from '@emotion/react';
import * as presets from './presets';
import { space } from '../space/space';
import { palette } from '../colour/palette';

const listCss = css`
	list-style: none;
	padding: 0;
	li + li {
		margin-top: ${space[4]}px;
		padding-top: ${space[4]}px;
		border-top: 1px solid ${palette.neutral[86]};
	}
`;

export const TypographyPresets = () => (
	<ul css={listCss}>
		{Object.entries(presets).map(([preset, styles]) => (
			<li>
				<span
					css={css`
						display: block;
					`}
				>
					{preset}
				</span>
				<span
					css={css`
						${styles}
					`}
				>
					For facts' sake
				</span>
			</li>
		))}
	</ul>
);
