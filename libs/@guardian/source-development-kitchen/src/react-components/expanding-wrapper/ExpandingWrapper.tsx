import { css } from '@emotion/react';
import { visuallyHidden } from '@guardian/source-foundations';
import { SvgMinus, SvgPlus } from '@guardian/source-react-components';
import { useEffect, useState } from 'react';
import type { CSSProperties, FC } from 'react';
import {
	buttonIconStyles,
	collapsibleBodyStyles,
	containerStyles,
	extraStyles,
	overlayStyles,
	showHideLabelStyles,
} from './styles';
import { expandingWrapperThemeDefault } from './theme';
import type { ExpandingWrapperProps, TabbableElementType } from './types';

export type { ExpandingWrapperProps } from './types';

const setTabIndex = (name: string, isExpanded: boolean) => {
	const collapsibleBody = document.getElementById(
		`expander-${name}__collapsible-body`,
	);
	if (!collapsibleBody) {
		return;
	}

	const tabbableElements: TabbableElementType[] = Array.from(
		collapsibleBody.querySelectorAll('input,textarea,select,button,a'),
	);
	tabbableElements.forEach((element: TabbableElementType) => {
		element.tabIndex = isExpanded ? 0 : -1;
	});
};

export const ExpandingWrapper: FC<ExpandingWrapperProps> = ({
	name,
	expandCallback,
	renderExtra,
	disableTabbingWhenCollapsed = true,
	children,
	theme = expandingWrapperThemeDefault,
	collapsedHeight = '240px',
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	useEffect(() => {
		disableTabbingWhenCollapsed && setTabIndex(name, isExpanded);
	}, [disableTabbingWhenCollapsed, isExpanded]);

	useEffect(() => {
		expandCallback?.(isExpanded);
	}, [isExpanded, expandCallback]);

	return (
		<div
			id={`expander-${name}`}
			css={containerStyles}
			style={
				// Setting CSS Custom Properties is not supported natively
				// by the underling type definitions, but here we have ensured
				// that all the keys are valid and start with a double dash `--`
				theme as CSSProperties
			}
		>
			<input
				type="checkbox"
				css={css`
					${visuallyHidden};
				`}
				className="expander__checkbox"
				id={`expander-checkbox-${name}`}
				onChange={({ target: { checked } }) => {
					setIsExpanded(checked);
				}}
				aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${name && name}`}
			/>
			<div
				className="expander__collapsible-body"
				id={`expander-${name}__collapsible-body`}
				css={collapsibleBodyStyles(collapsedHeight)}
				aria-hidden={!isExpanded}
			>
				{children}
			</div>

			{!isExpanded && <div css={overlayStyles} />}
			{renderExtra && <span css={extraStyles}>{renderExtra()}</span>}
			<label
				aria-hidden={true}
				css={showHideLabelStyles}
				htmlFor={`expander-checkbox-${name}`}
			>
				{isExpanded ? (
					<>
						<span id="svgminus" css={buttonIconStyles}>
							<SvgMinus />
						</span>
						Show less
					</>
				) : (
					<>
						<span id="svgplus" css={buttonIconStyles}>
							<SvgPlus />
						</span>
						Show more
					</>
				)}
			</label>
		</div>
	);
};
