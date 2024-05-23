import type { Theme } from '../@types/Theme';
import { SvgTickRound } from '../__generated__/icons/SvgTickRound';
import type { UserFeedbackProps } from './@types/UserFeedbackProps';
import { mergedTheme } from './shared';
import { inlineSuccess } from './styles';

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/story/source_react-components-inlinesuccess--inline-success-default-theme) •
 * [Design System](https://theguardian.design/2a1e5182b/p/108ed3-user-feedback/b/3803b4) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source/src/react-components/user-feedback/InlineSuccess.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source)
 *
 * Success messages acknowledge a user's action and do not require further action. They inform the user of processes happening in the background. For example, "Your account details have been saved."
 *
 * The following themes are supported: `default`, `brand`
 */
export const InlineSuccess = ({
	children,
	size = 'medium',
	cssOverrides,
	theme,
	...props
}: UserFeedbackProps) => (
	<span
		css={(providerTheme: Theme) => [
			inlineSuccess(mergedTheme(providerTheme.userFeedback, theme), size),
			cssOverrides,
		]}
		role="alert"
		{...props}
	>
		<SvgTickRound />
		{children}
	</span>
);
