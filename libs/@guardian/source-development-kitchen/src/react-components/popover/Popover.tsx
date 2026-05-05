import { css } from '@emotion/react';
import {
	palette,
	space,
	textSans15,
	textSansBold15,
} from '@guardian/source/foundations';
import { Button, SvgCross } from '@guardian/source/react-components';

export interface PopoverProps {
	/**
	 * Children to render inside the popover component. Can include text and buttons, for example
	 */
	content?: React.ReactNode;
	/**
	 * Optional title for the popover
	 */
	title?: string;
	/**
	 * Callback fired when the dismiss button is clicked.
	 */
	onDismiss: () => void;
	/**
	 * Colour theme to apply to the popover.
	 * Options are: medium, light, dark
	 */
	theme?: 'medium' | 'light' | 'dark';
	/**
	 * Primary button text. If not provided, no button will render
	 */
	buttonText?: string;
	/**
	 * Primary button action
	 */
	buttonOnClick?: () => void;
}

const containerStyles = css`
	${textSans15};
	z-index: 1000;
	background-color: var(--background);
	border-radius: ${space[2]}px;
	padding: ${space[3]}px ${space[4]}px ${space[4]}px;
	min-width: 200px;
	max-width: 320px;
	color: var(--text);
`;

const headerStyles = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const headerStylesWithoutTitle = css`
	justify-content: end;
`;

const titleStyles = css`
	${textSansBold15}
	margin-bottom: ${space[2]}px;
`;

const themeStyles = (theme: PopoverProps['theme']) => {
	switch (theme) {
		case 'light':
			return css`
				--background: ${palette.neutral[100]};
				--text: ${palette.neutral[7]};
				--dismiss-btn: ${palette.neutral[0]};
				--dismiss-btn-background: ${palette.neutral[97]};
				--dismiss-btn-background-hover: ${palette.neutral[93]};
			`;
		case 'dark':
			return css`
				--background: ${palette.neutral[10]};
				--text: ${palette.neutral[97]};
				--dismiss-btn: ${palette.neutral[100]};
				--dismiss-btn-background: ${palette.neutral[20]};
				--dismiss-btn-background-hover: ${palette.neutral[38]};
			`;
		case 'medium':
		default:
			return css`
				--background: ${palette.neutral[93]};
				--text: ${palette.neutral[7]};
				--dismiss-btn: ${palette.neutral[0]};
				--dismiss-btn-background: ${palette.neutral[86]};
				--dismiss-btn-background-hover: ${palette.neutral[73]};
			`;
	}
};

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/story/source-development-kitchen_react-components-popover--default) •
 * [Design System](https://theguardian.design) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-development-kitchen/src/popover/Popover.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-development-kitchen)
 *
 * Displays a popover component, with text and optional CTA button as well as a dismiss button.
 * Positioned absolutely relative to its nearest positioned ancestor.
 * See the accompanying stories for visual examples.
 *
 */
export const Popover = ({
	onDismiss,
	content,
	title,
	theme,
	buttonText,
	buttonOnClick,
}: PopoverProps) => {
	return (
		<div css={[themeStyles(theme), containerStyles]} role="dialog">
			<div css={[headerStyles, !title && headerStylesWithoutTitle]}>
				{!!title && <span css={titleStyles}>{title}</span>}

				<Button
					icon={<SvgCross />}
					size="xsmall"
					priority="tertiary"
					theme={{
						textTertiary: 'var(--dismiss-btn)',
						backgroundTertiary: 'var(--dismiss-btn-background)',
						backgroundTertiaryHover: 'var(--dismiss-btn-background-hover)',
						borderTertiary: 'unset',
					}}
					onClick={onDismiss}
					hideLabel={true}
					aria-label="Dismiss"
					type="button"
					cssOverrides={css`
						svg {
							width: 16px;
							height: auto;
						}
					`}
				>
					Dismiss
				</Button>
			</div>

			{content}

			{!!buttonText && (
				<div
					css={css`
						margin-top: ${space[3]}px;
					`}
				>
					<Button priority="primary" size="xsmall" onClick={buttonOnClick}>
						{buttonText}
					</Button>
				</div>
			)}
		</div>
	);
};
