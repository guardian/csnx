import type { Theme } from '../@types/Theme';
import { SvgAlertRound } from '../__generated__/icons/SvgAlertRound';
import type { UserFeedbackProps } from './@types/UserFeedbackProps';
import { mergedTheme } from './shared';
import { inlineError } from './styles';

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/story/source_react-components-inlineerror--inline-error-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/108ed3-user-feedback/b/3803b4) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source/src/react-components/user-feedback/InlineError.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-feedback)
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
}: UserFeedbackProps) => {
	return (
		<span
			css={(providerTheme: Theme) => [
				inlineError(mergedTheme(providerTheme.userFeedback, theme), size),
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
