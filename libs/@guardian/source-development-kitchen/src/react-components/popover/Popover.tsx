import { css, type SerializedStyles } from '@emotion/react';
import {
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
import { useEffect, useRef, useState } from 'react';
import { getPositionStyles } from './position';
import { getThemeColours, type ThemePopover } from './theme';

export interface PopoverProps {
	/**
	 * Title for the Popover. This is used for the aria label so is a required prop.
	 * The visibility of the title can be controlled using the prop `hideTitle`.
	 */
	title: string;
	/**
	 * Content to render inside the popover component e.g. text, links, buttons
	 */
	content: React.ReactNode;
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
	 * The items which control the popover visibility, which the popover is anchored to
	 */
	triggerButtonProps?: ButtonProps;
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
	border: none;
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
 * Displays a popover component, with content and an optional title, positioned relative to its trigger button.
 * The popover has a dismiss button but should also be dismissible with the escape key or by clicking outside of the element area.
 * The trigger button props are set to a default value but can be overridden via `triggerButtonProps`.
 * The pointer and position of the popover in relation to the trigger button can be controlled via the `cssOverrides` prop.
 * See the accompanying stories for visual examples.
 */
export const Popover = ({
	content,
	title,
	hideTitle,
	width,
	theme,
	position,
	showPointer,
	triggerButtonProps,
	cssOverrides,
}: PopoverProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const popoverRootRef = useRef<HTMLDivElement>(null);

	const {
		background: backgroundColour,
		text: textColour,
		dismissButtonText,
		dismissButtonBackground,
		dismissButtonBackgroundHover,
	} = getThemeColours(theme);

	useEffect(() => {
		if (!isOpen || !popoverRootRef.current) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			// Respond to escape key press by closing popover
			if (event.code === 'Escape') {
				setIsOpen(false);
			}
		};

		// Respond to clicking away by closing popover
		const dismissOnClickElsewhere = (event: MouseEvent) => {
			if (
				event.target instanceof Node &&
				!popoverRootRef.current?.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('click', dismissOnClickElsewhere);
		// Remove listeners on unmount
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('click', dismissOnClickElsewhere);
		};
	}, [isOpen]);

	return (
		<div
			ref={popoverRootRef}
			className="popover-root"
			css={[
				css`
					position: relative;
					--popover-background: ${backgroundColour};
					--popover-text: ${textColour};
					--popover-width: ${width ?? 'auto'};
				`,
			]}
		>
			<Button
				type="button"
				size="xsmall"
				hideLabel={true}
				icon={<SvgInfoRound />}
				onClick={() => setIsOpen(!isOpen)}
				priority="subdued"
				{...triggerButtonProps}
				data-testid="popover-trigger"
				aria-haspopup="dialog"
			>
				{`More information about ${title}`}
			</Button>

			<div
				className="popover"
				css={[
					containerStyles,
					!isOpen && hiddenStyles,
					...getPositionStyles(position, showPointer),
					!!cssOverrides && cssOverrides,
				]}
				role="dialog"
				aria-modal={false}
				aria-label={title}
			>
				{!hideTitle && <span css={titleStyles}>{title}</span>}

				<div
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
					onClick={() => setIsOpen(false)}
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
