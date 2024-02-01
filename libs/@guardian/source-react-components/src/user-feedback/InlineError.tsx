import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { SvgAlertRound } from '../../vendor/icons/SvgAlertRound';
import type { Theme } from '../@types/Theme';
import { combineThemes } from './shared';
import { inlineError } from './styles';
import type { UserFeedbackProps } from './types';

/**
 * [Storybook](https://guardian.github.io/csnx/?path=/story/source-react-components_inlineerror--inline-error-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/108ed3-user-feedback/b/3803b4) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-react-components/src/user-feedback/InlineError.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-react-components-feedback)
 *
 * Used to inform the user when a validation has failed or user error has occurred. These messages indicate what went wrong and how to fix it.
 *
 * The following themes are supported: `default`, `brand`
 */
export const InlineError = ({
	children,
	size = 'medium',
	cssOverrides,
	theme,
	...props
}: UserFeedbackProps): EmotionJSX.Element => {
	return (
		<span
			css={(providerTheme: Theme) => [
				inlineError(combineThemes(providerTheme.userFeedback, theme), size),
				cssOverrides,
			]}
			role="alert"
			{...props}
		>
			<SvgAlertRound />
			{children}
		</span>
	);
};
