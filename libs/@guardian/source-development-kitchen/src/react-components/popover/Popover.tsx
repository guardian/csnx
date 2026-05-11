import { css, type SerializedStyles } from '@emotion/react';
import {
	palette,
	space,
	textSans15,
	textSansBold15,
} from '@guardian/source/foundations';
import { Button, SvgCross } from '@guardian/source/react-components';

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
	 * The anchor element which triggers the Popover component to show
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
	 * Colour theme to apply to the popover.
	 * Options are: medium, light, dark
	 */
	theme?: 'medium' | 'light' | 'dark';
	/**
	 * Describes which side of the target element the popover should appear
	 */
	position?: 'top' | 'bottom' | 'left' | 'right';
	/**
	 * Whether to show the pointer or not
	 */
	showPointer?: boolean;
	/**
	 * Popover position override styles. The pointer styles can be overridden by targeting the :after pseudo element
	 */
	positionOverrides?: SerializedStyles;
}

const containerStyles = css`
	display: none;
	z-index: -1;
	${textSans15};
	position: absolute;
	background-color: var(--background);
	border-radius: ${space[2]}px;
	padding: ${space[3]}px ${space[4]}px ${space[4]}px;
	min-width: 120px;
	max-width: 600px;
	height: auto;
	color: var(--text);
`;

const topPosition = css`
	bottom: calc(100% + ${space[2]}px);
	left: 50%;
	transform: translateX(-50%);
`;
const bottomPointer = css`
	bottom: calc(100% + ${space[5]}px);
	&:after {
		position: absolute;
		content: '';
		width: 0px;
		height: 0px;
		left: calc(50% - ${space[3]}px);
		bottom: -${space[3]}px;
		border-top: ${space[3]}px solid var(--background);
		border-left: ${space[3]}px solid transparent;
		border-right: ${space[3]}px solid transparent;
	}
`;

const bottomPosition = css`
	top: calc(100% + ${space[2]}px);
	left: 50%;
	transform: translateX(-50%);
`;
const topPointer = css`
	top: calc(100% + ${space[5]}px);
	&:after {
		position: absolute;
		content: '';
		width: 0px;
		height: 0px;
		left: calc(50% - ${space[3]}px);
		top: -${space[3]}px;
		border-bottom: ${space[3]}px solid var(--background);
		border-left: ${space[3]}px solid transparent;
		border-right: ${space[3]}px solid transparent;
	}
`;

const rightPosition = css`
	left: calc(100% + ${space[2]}px);
	top: 50%;
	transform: translateY(-50%);
`;
const leftPointer = css`
	left: calc(100% + ${space[5]}px);
	&:after {
		position: absolute;
		content: '';
		top: calc(50% - ${space[3]}px);
		left: -${space[3]}px;
		width: 0px;
		height: 0px;
		border-right: ${space[3]}px solid var(--background);
		border-top: ${space[3]}px solid transparent;
		border-bottom: ${space[3]}px solid transparent;
	}
`;

const leftPosition = css`
	right: calc(100% + ${space[2]}px);
	top: 50%;
	transform: translateY(-50%);
`;
const rightPointer = css`
	right: calc(100% + ${space[5]}px);
	&:after {
		position: absolute;
		content: '';
		width: 0px;
		height: 0px;
		top: calc(50% - ${space[3]}px);
		right: -${space[3]}px;
		border-left: ${space[3]}px solid var(--background);
		border-top: ${space[3]}px solid transparent;
		border-bottom: ${space[3]}px solid transparent;
	}
`;

/** Relatively positions the Popover element and pointer, if applicable */
const getPositionStyles = (
	position: PopoverProps['position'],
	showPointer: PopoverProps['showPointer'],
): SerializedStyles[] => {
	switch (position) {
		case 'right':
			return showPointer ? [rightPosition, leftPointer] : [rightPosition];
		case 'left':
			return showPointer ? [leftPosition, rightPointer] : [leftPosition];
		case 'top':
			return showPointer ? [topPosition, bottomPointer] : [topPosition];
		case 'bottom':
		default:
			return showPointer ? [bottomPosition, topPointer] : [bottomPosition];
	}
};

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
	return (
		<div
			className="popover-root"
			css={css`
				position: relative;
			`}
		>
			{anchorElement}

			<div
				className="popover"
				css={[
					themeStyles(theme),
					containerStyles,
					isOpen && visibleStyles,
					...getPositionStyles(position, showPointer),
					!!positionOverrides && positionOverrides,
				]}
				role="dialog"
				aria-hidden={!isOpen}
				style={{ width }}
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
						onClick={handleClose}
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

				{children}
			</div>
		</div>
	);
};
