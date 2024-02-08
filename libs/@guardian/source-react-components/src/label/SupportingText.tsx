import { css } from '@emotion/react';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { visuallyHidden as _visuallyHidden } from '@guardian/source-foundations';
import type { ReactNode } from 'react';
import type { Theme } from '../@types/Theme';
import { mergedThemes } from './shared';
import { supportingText } from './styles';
import type { ThemeLabel } from './theme';

const visuallyHidden = css`
	${_visuallyHidden}
`;

export const SupportingText = ({
	hideLabel,
	children,
	theme,
}: {
	hideLabel?: boolean;
	children: ReactNode;
	theme?: Partial<ThemeLabel>;
}): EmotionJSX.Element => {
	return (
		<p
			css={(providerTheme: Theme) => [
				supportingText(mergedThemes(providerTheme.label, theme)),
				hideLabel ? visuallyHidden : '',
			]}
		>
			{children}
		</p>
	);
};
