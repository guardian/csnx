import { css, type SerializedStyles } from '@emotion/react';
import {
	space,
	textSans15,
	textSansBold15,
} from '@guardian/source/foundations';
import { Button, SvgCross } from '@guardian/source/react-components';
import { useEffect, useRef } from 'react';
import { getPositionStyles } from './position';
import { getThemeColours, type ThemePopover } from './theme';

export interface PopoverProps {
	/**
	 * Children to render inside the popover component e.g. text, links, buttons
	 */
	children: React.ReactNode;
	/**
	 * Determines whether the popover is open or closed
	 */
	isOpen: boolean;
	/**
	 * A function to handle closing of the Popover
	 */
	handleClose: () => void;
	/**
	 * The element which the popover is anchored to, in terms of positioning.
	 * This should control the visibility of the Popover by setting the `isOpen` prop.
	 */
	anchorElement: React.ReactElement;
	/**
	 * Title for the Popover. This is used for the aria label so is a required prop.
	 * The visibility of the title can be controlled using the prop `hideTitle`.
	 */
	title: string;
	/**
	 * Controls the visibility of the title.
	 */
	hideTitle?: boolean;
	/**
	 * The width of the Popover component
	 */
	width?: string;
	/**
	 * Partial or complete theme to override the component's colour palette.
	 * The colours which can be changed are:
	 *
	 *  `text`<br>
	 *  `background`<br>
	 *  `dismissButtonText`<br>
	 *  `dismissButtonBackground`<br>
	 *  `dismissButtonBackgroundHover`<br>
	 *
	 * If you do not supply `dismissButtonBackgroundHover`, it will be calculated if there is a hex code background colour.
	 */
	theme?: Partial<ThemePopover>;
	/**
	 * Determines which side of the anchor element the popover should appear.
	 */
	position?: 'top' | 'bottom' | 'left' | 'right';
	/**
	 * Determines whether to show the pointer or not.
	 */
	showPointer?: boolean;
	/**
	 * Allows overriding the popover styles. This can include overriding positioning styles as well as the pointer.
	 * The pointer styles can be overridden by targeting the :after pseudo element of the `popover` class.
	 */
	cssOverrides?: SerializedStyles;
}

const containerStyles = css`
	display: grid;
	grid-template-areas:
		'title dismissButton'
		'children children';
	position: absolute;
	/* Arbitrary large value to sit on top of other content */
	z-index: 1000;
	${textSans15};
	background-color: var(--popover-background);
	color: var(--popover-text);
	border-radius: ${space[2]}px;
	padding: ${space[3]}px ${space[4]}px ${space[4]}px;
	height: auto;
	width: var(--popover-width);
	/* Keep popovers usable across content sizes by enforcing sensible width bounds */
	min-width: 120px;
	max-width: 600px;
`;

const hiddenStyles = css`
	display: none;
`;

const titleStyles = css`
	grid-area: title;
	${textSansBold15}
	margin-bottom: ${space[2]}px;
`;

/**
 * [Storybook](https://guardian.github.io/storybooks/?path=/story/source-development-kitchen_react-components-popover--default) •
 * [Design System](https://theguardian.design) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-development-kitchen/src/react-components/popover/Popover.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-development-kitchen)
 *
 * Displays a popover component, with children and an optional title, positioned relative to its anchor element.
 * Has a dismiss button but should also be dismissible with the escape key or by clicking outside of the popover element area.
 * The visibility of the Popover component is controlled by the parent via the isOpen and handleClose props.
 * See the accompanying stories for visual examples.
 */
export const Popover = ({
	isOpen,
	handleClose,
	children,
	anchorElement,
	title,
	hideTitle,
	width,
	theme,
	position,
	showPointer,
	cssOverrides,
}: PopoverProps) => {
	const {
		background: backgroundColour,
		text: textColour,
		dismissButtonText,
		dismissButtonBackground,
		dismissButtonBackgroundHover,
	} = getThemeColours(theme);

	const popoverRef = useRef<HTMLDivElement>(null);

	// Respond to escape key by closing Popover
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			console.log(event.code);
			console.log(document.activeElement);
			// close on click escape key
			if (isOpen && event.code === 'Escape') {
				handleClose();
			}
			// close on tab away from popover
			else if (
				isOpen &&
				event.code === 'Tab' &&
				document.activeElement ===
					popoverRef.current?.querySelector(`button[name='dismiss-button']`)
			) {
				handleClose();
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		// Remove listeners on unmount
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, handleClose]);

	// Respond to clicking outside of the popover and triggering button area by closing Popover
	useEffect(() => {
		if (!isOpen || !popoverRef.current) {
			return;
		}

		const dismissOnClickAway = (event: MouseEvent) => {
			if (
				event.target instanceof Node &&
				!popoverRef.current?.contains(event.target)
			) {
				handleClose();
			}
		};
		document.addEventListener('click', dismissOnClickAway);
		// Remove listeners on unmount
		return () => document.removeEventListener('click', dismissOnClickAway);
	}, [isOpen, handleClose]);

	return (
		<div
			className="popover-root"
			css={[
				css`
					position: relative;
					--popover-background: ${backgroundColour};
					--popover-text: ${textColour};
					--popover-width: ${width ?? 'auto'};
				`,
			]}
			ref={popoverRef}
		>
			{anchorElement}

			<div
				className="popover"
				css={[
					containerStyles,
					!isOpen && hiddenStyles,
					...getPositionStyles(position, showPointer),
					!!cssOverrides && cssOverrides,
				]}
				role="dialog"
				aria-label={title}
			>
				{!hideTitle && <span css={titleStyles}>{title}</span>}

				<div
					css={css`
						grid-area: children;
					`}
				>
					{children}
				</div>

				<Button
					name="dismiss-button"
					icon={<SvgCross size="xsmall" />}
					size="xsmall"
					priority="tertiary"
					theme={{
						textTertiary: dismissButtonText,
						backgroundTertiary: dismissButtonBackground,
						backgroundTertiaryHover: dismissButtonBackgroundHover,
						borderTertiary: 'transparent',
					}}
					onClick={handleClose}
					hideLabel={true}
					cssOverrides={css`
						grid-area: dismissButton;
						justify-self: end;
					`}
				>
					Dismiss
				</Button>
			</div>
		</div>
	);
};
