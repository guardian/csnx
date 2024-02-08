import { css } from '@emotion/react';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { visuallyHidden as _visuallyHidden } from '@guardian/source-foundations';
import type { Theme } from '../@types/Theme';
import { mergedThemes } from './shared';
import { labelText, optionalText } from './styles';
import type { LabelProps } from './types';

const visuallyHidden = css`
	${_visuallyHidden}
`;

export const Text = ({
	text,
	optional,
	hideLabel,
	size = 'medium',
	theme,
}: LabelProps): EmotionJSX.Element => (
	<div
		css={(providerTheme: Theme) => [
			labelText(mergedThemes(providerTheme.label, theme), size),
			hideLabel ? visuallyHidden : '',
		]}
	>
		{text}{' '}
		{optional ? (
			<span
				css={(providerTheme: Theme) =>
					optionalText(mergedThemes(providerTheme.label, theme))
				}
			>
				Optional
			</span>
		) : (
			''
		)}
	</div>
);
