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
	 * Children to render inside the popover component e.g. text, links or buttons
	 */
	children: React.ReactNode;
	/**
	 * Is the Popover open or closed?
	 */
	isOpen: boolean;
	/**
	 * Callback fired when the Popover is closed
	 */
	handleClose: () => void;
	/**
	 * The element which the popover is anchored to, in terms of positioning.
	 * This element should control the visibility of the Popover by allowing it to show (by setting `isOpen`)
	 */
	anchorElement: React.ReactElement;
	/**
	 * Optional title for the popover
	 */
	title?: string;
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
	 * Describes which side of the anchor element the popover should appear
	 */
	position?: 'top' | 'bottom' | 'left' | 'right';
	/**
	 * Whether to show the pointer or not
	 */
	showPointer?: boolean;
	/**
	 * Popover position override styles.
	 * The pointer styles can be overridden by targeting the :after pseudo element of the `popover` class
	 */
	positionOverrides?: SerializedStyles;
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
	/* TODO - Check these values */
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
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-development-kitchen/src/popover/Popover.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-development-kitchen)
 *
 * Displays a popover component, with children and an optional title, positioned relative to its anchor element.
 * Has a dismiss button but should also be dismissable with the escape key or by clicking outside of the popover element area.
 * The state of the Popover component is controlled by the parent, which control the Popover visibiliy via the isOpen and handleClose props.
 * See the accompanying stories for visual examples.
 */
export const Popover = ({
	isOpen,
	handleClose,
	children,
	anchorElement,
	title,
	width,
	theme,
	position,
	showPointer,
	positionOverrides,
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
		const dismissOnEsc = (event: KeyboardEvent) => {
			if (isOpen && event.code === 'Escape') {
				handleClose();
			}
		};
		document.addEventListener('keydown', dismissOnEsc);
		// Remove listeners on unmount
		return () => document.removeEventListener('keydown', dismissOnEsc);
	}, [isOpen, handleClose]);

	// Respond to clicking outside of the popover and triggering button area by closing Popover
	useEffect(() => {
		if (!isOpen || !popoverRef.current) {
			return;
		}

		const dismissOnClickElsewhere = (event: MouseEvent) => {
			if (
				event.target instanceof Node &&
				!popoverRef.current?.contains(event.target)
			) {
				event.stopPropagation();
				handleClose();
			}
		};
		document.addEventListener('click', dismissOnClickElsewhere);
		// Remove listeners on unmount
		return () => document.removeEventListener('click', dismissOnClickElsewhere);
	}, [isOpen, handleClose]);

	return (
		<div
			ref={popoverRef}
			className="popover-root"
			css={[
				css`
					position: relative;
					--popover-background: ${backgroundColour};
					--popover-text: ${textColour};
					--popover-width: ${width};
				`,
			]}
		>
			{anchorElement}

			<div
				className="popover"
				css={[
					containerStyles,
					!isOpen && hiddenStyles,
					...getPositionStyles(position, showPointer),
					!!positionOverrides && positionOverrides,
				]}
				role="dialog"
			>
				{!!title && <span css={titleStyles}>{title}</span>}

				<div
					css={css`
						grid-area: children;
					`}
				>
					{children}
				</div>

				<Button
					icon={<SvgCross size="xsmall" />}
					size="xsmall"
					priority="tertiary"
					theme={{
						textTertiary: dismissButtonText,
						backgroundTertiary: dismissButtonBackground,
						backgroundTertiaryHover: dismissButtonBackgroundHover,
						borderTertiary: 'unset',
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
