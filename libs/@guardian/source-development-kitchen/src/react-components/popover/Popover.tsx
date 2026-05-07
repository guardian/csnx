import { css } from '@emotion/react';
import {
	palette,
	space,
	textSans15,
	textSansBold15,
} from '@guardian/source/foundations';
import {
	Button,
	type ButtonProps,
	SvgCross,
	SvgInfoRound,
} from '@guardian/source/react-components';
import { useEffect, useState } from 'react';

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
	ctaButtonText?: string;
	/**
	 * Primary button action
	 */
	ctaButtonOnClick?: () => void;
	/**
	 * Describes which side the pointer should be on
	 */
	pointerSide?: 'top' | 'bottom' | 'left' | 'right';
	/**
	 * The target element that controls the popover visibility
	 */
	children: React.ReactNode;
	/**
	 *
	 */
	refButtonOverrides: Partial<ButtonProps>;
	width?: number;
}

const containerStyles = css`
	display: none;
	z-index: -1;
	${textSans15};
	position: absolute;
	background-color: var(--background);
	border-radius: ${space[2]}px;
	padding: ${space[3]}px ${space[4]}px ${space[4]}px;
	min-width: 200px;
	max-width: 320px;
	color: var(--text);
`;

const bottomPointer = css`
	bottom: calc(100% + ${space[5]}px);
	right: -100px; /* Fixme */
	&:after {
		position: absolute;
		content: '';
		width: 0px;
		height: 0px;
		left: calc(50% - ${space[3] / 2}px);
		bottom: -${space[3]}px;
		border-top: ${space[3]}px solid var(--background);
		border-left: ${space[3]}px solid transparent;
		border-right: ${space[3]}px solid transparent;
	}
`;

const topPointer = css`
	top: calc(100% + ${space[5]}px);
	right: -100px; /* Fixme */
	&:after {
		position: absolute;
		content: '';
		width: 0px;
		height: 0px;
		left: calc(50% - ${space[3] / 2}px);
		top: -${space[3]}px;
		border-bottom: ${space[3]}px solid var(--background);
		border-left: ${space[3]}px solid transparent;
		border-right: ${space[3]}px solid transparent;
	}
`;

const leftPointer = css`
	left: calc(100% + ${space[5]}px);
	bottom: -100px; /* Fixme */
	&:after {
		position: absolute;
		content: '';
		top: calc(50% - ${space[3] / 2}px);
		left: -${space[3]}px;
		width: 0px;
		height: 0px;
		border-right: ${space[3]}px solid var(--background);
		border-top: ${space[3]}px solid transparent;
		border-bottom: ${space[3]}px solid transparent;
	}
`;

const rightPointer = css`
	right: calc(100% + ${space[5]}px);
	bottom: -100px; /* Fixme */
	&:after {
		position: absolute;
		content: '';
		width: 0px;
		height: 0px;
		top: calc(50% - ${space[3] / 2}px);
		right: -${space[3]}px;
		border-left: ${space[3]}px solid var(--background);
		border-top: ${space[3]}px solid transparent;
		border-bottom: ${space[3]}px solid transparent;
	}
`;

const visibleStyles = css`
	display: block;
	z-index: 1000;
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

const marginTop = css`
	margin-top: ${space[3]}px;
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
	ctaButtonText,
	ctaButtonOnClick,
	pointerSide,
	refButtonOverrides,
}: PopoverProps) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const dismissButtonOnClick = () => {
		setIsExpanded(false);
		onDismiss();
	};

	useEffect(() => {
		const dismissOnEsc = (event: KeyboardEvent) => {
			if (isExpanded && event.code === 'Escape') {
				setIsExpanded(false);
			}
		};

		document.addEventListener('keydown', dismissOnEsc, false);

		// Remove listener on unmount
		return () => document.removeEventListener('keydown', dismissOnEsc);
	}, [isExpanded]);

	// TODO: Handle clicking away from the popover (dismiss if click is outside of popover area)
	// useEffect(() => {
	// 	if (!isExpanded) {
	// 		return;
	// 	}

	// 	const dismissOnClickAway = (event: MouseEvent) => {
	// 		// If the source of the click is the button, do nothing as the
	// 		// button's click handler will have already toggled the isExpanded
	// 		// state
	// 		// if (buttonRef === event.target) {
	// 		// 	return;
	// 		// }
	// 		event.stopPropagation();
	// 		setIsExpanded(false);
	// 	};

	// 	document.addEventListener('click', dismissOnClickAway, false);

	// 	// Remove listener on unmount
	// 	return () => document.removeEventListener('click', dismissOnClickAway);
	// }, [isExpanded]);

	return (
		<div
			className="popover-root"
			css={css`
				position: relative;
			`}
		>
			{/** This is the trigger which opens the popover */}
			<Button
				icon={<SvgInfoRound />}
				size="xsmall"
				priority="tertiary"
				theme={{ borderTertiary: 'unset' }}
				hideLabel={true}
				onClick={() => setIsExpanded(!isExpanded)}
				{...refButtonOverrides}
			/>

			<div
				className="popover"
				css={[
					themeStyles(theme),
					containerStyles,
					pointerSide === 'top' && topPointer,
					pointerSide === 'right' && rightPointer,
					pointerSide === 'bottom' && bottomPointer,
					pointerSide === 'left' && leftPointer,
					isExpanded && visibleStyles,
				]}
				role="dialog"
				aria-hidden={!isExpanded}
			>
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
						onClick={dismissButtonOnClick}
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

				{!!ctaButtonText && (
					<div css={marginTop}>
						<Button priority="primary" size="xsmall" onClick={ctaButtonOnClick}>
							{ctaButtonText}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};
