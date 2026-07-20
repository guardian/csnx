import { css, type SerializedStyles } from '@emotion/react';
import {
	space,
	textSans15,
	textSansBold15,
} from '@guardian/source/foundations';
import { Button, SvgCross } from '@guardian/source/react-components';
import { useEffect, useId, useRef } from 'react';
import { tabbable } from 'tabbable';
import { getPositionStyles } from './position';
import { getThemeColours, type ThemePopover } from './theme';

export interface PopoverProps {
	/**
	 * Content to render inside the popover component e.g. text, links, buttons
	 */
	content: React.ReactNode;
	/**
	 * Determines whether the popover is open or closed
	 */
	isOpen: boolean;
	/**
	 * A function to handle closing of the Popover
	 */
	handleClose: () => void;
	/**
	 * The element which triggers the popover to open by setting the `isOpen` prop.
	 * The positioning of the popover is relative to this trigger element.
	 */
	trigger: React.ReactElement;
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
		'content content';
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
 * Displays a popover component, with children and an optional title, positioned relative to its trigger element.
 * Has a dismiss button but should also be dismissible with the escape key or by clicking outside of the popover element area.
 * The visibility of the Popover component is controlled by the parent via the isOpen and handleClose props.
 * See the accompanying stories for visual examples.
 */
export const Popover = ({
	isOpen,
	handleClose,
	content,
	trigger,
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

	const popoverId = useId();
	const titleId = useId();
	const contentId = useId();
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen || !containerRef.current) {
			return;
		}

		/** Respond to clicking outside of the popover and triggering button area by closing Popover */
		const dismissOnClickElsewhere = (event: MouseEvent) => {
			if (
				event.target instanceof Node &&
				!containerRef.current?.contains(event.target)
			) {
				handleClose();
			}
		};

		/**
		 * Handles tab key events by moving focus between tabbable elements within the container
		 */
		const handleTabKey = (event: KeyboardEvent) => {
			const popoverEl = document.getElementById(popoverId);
			const tabbableItems = popoverEl ? tabbable(popoverEl) : [];
			const firstTabbableItem = tabbableItems[0];
			const lastTabbableItem = tabbableItems[tabbableItems.length - 1];
			// Shift + tab moves focus from first element to last element
			if (event.shiftKey && document.activeElement === firstTabbableItem) {
				// Move focus to last tabbable element
				event.preventDefault();
				lastTabbableItem?.focus();
			}
			// Tab moves focus from last element to first element
			else if (document.activeElement === lastTabbableItem) {
				// Move focus to first tabbable element
				event.preventDefault();
				firstTabbableItem?.focus();
			}
		};

		/**
		 * Handler for keydown event listener
		 * - Respond to escape key by closing Popover
		 * - Respond to tab key by keeping focus within Popover area
		 */
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.code === 'Escape') {
				// Close on escape key
				handleClose();
			} else if (event.code !== 'Tab') {
				// Early return if not tab key
				return;
			} else {
				// Otherwise, handle tab key
				handleTabKey(event);
			}
		};

		document.addEventListener('click', dismissOnClickElsewhere);
		document.addEventListener('keydown', handleKeydown);
		// Remove listeners on unmount
		return () => {
			document.removeEventListener('click', dismissOnClickElsewhere);
			document.removeEventListener('keydown', handleKeydown);
		};
	}, [isOpen, handleClose, popoverId]);

	return (
		<div
			ref={containerRef}
			css={[
				css`
					position: relative;
					--popover-background: ${backgroundColour};
					--popover-text: ${textColour};
					--popover-width: ${width ?? 'auto'};
				`,
			]}
		>
			{trigger}

			<div
				id={popoverId}
				className="popover"
				css={[
					containerStyles,
					!isOpen && hiddenStyles,
					...getPositionStyles(position, showPointer),
					!!cssOverrides && cssOverrides,
				]}
				role="dialog"
				aria-modal={false}
				aria-labelledby={hideTitle ? title : titleId}
				aria-describedby={contentId}
			>
				{!hideTitle && (
					<span id={titleId} css={titleStyles}>
						{title}
					</span>
				)}

				<div
					id={contentId}
					css={css`
						grid-area: content;
					`}
				>
					{content}
				</div>

				<Button
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
					Close
				</Button>
			</div>
		</div>
	);
};
