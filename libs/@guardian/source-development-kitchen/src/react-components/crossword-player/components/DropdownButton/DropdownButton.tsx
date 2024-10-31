/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { isInViewport } from '../../utils/general';

const CaretDownIcon = () => (
	<svg
		css={dropdownIconStyle}
		x="0"
		y="0"
		width="8px"
		height="8px"
		viewBox="0 0 292.362 292.362"
	>
		<g>
			<path d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424   C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428   s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z" />
		</g>
	</svg>
);

export interface DropdownMenuItem {
	disabled?: boolean;
	onClick: () => void;
	text: string;
}

interface DropdownButtonProps {
	id?: string;
	menu: DropdownMenuItem[];
	text: string;
}

// Styles
const dropdownButtonStyle = css`
	position: relative;
	user-select: none;
`;

const buttonStyle = css`
	background-color: #1976d2;
	color: #fff;
	padding: 8px 12px;
	margin: 5px;
	font-weight: bold;
	border: none;
	cursor: pointer;
	white-space: nowrap;
	border-radius: 2px;
	&:hover {
		background-color: #115293;
	}
`;

const expandedButtonStyle = css`
	background-color: #115293;
`;

const dropdownIconStyle = css`
	fill: #fff;
`;

const menuStyle = css`
	visibility: hidden;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	position: absolute;
	background-color: #fff;
	border: 1px solid rgba(0, 0, 0, 0.15);
	z-index: 2;
	margin: 0 5px;
	border-radius: 2px;
	min-width: calc(100% - 10px);
	padding: 0;
	list-style: none;
`;

const visibleMenuStyle = css`
	visibility: visible;
`;

const menuItemStyle = css`
	display: flex;
	background-color: transparent;
	border: none;
	padding: 8px 12px;
	white-space: nowrap;
	text-overflow: ellipsis;
	width: 100%;
	&:not(:disabled):hover {
		background-color: rgba(0, 0, 0, 0.08);
		cursor: pointer;
	}
`;

function DropdownButton({ id, menu, text }: DropdownButtonProps) {
	if (menu.length < 2) {
		throw new Error('DropdownButton should have at least 2 menu items');
	}

	const componentRef = React.useRef<HTMLDivElement>(null);
	const buttonRef = React.useRef<HTMLButtonElement>(null);
	const menuRef = React.useRef<HTMLUListElement>(null);
	const [menuExpanded, setMenuExpanded] = React.useState(false);

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuExpanded &&
				componentRef.current &&
				!componentRef.current.contains(event.target as Node)
			) {
				setMenuExpanded(false);
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, [menuExpanded]);

	const toggleMenuExpanded = () => {
		if (menuRef.current && buttonRef.current) {
			menuRef.current.style.marginTop = '';

			if (!menuExpanded) {
				const menuRect = menuRef.current.getBoundingClientRect();
				const inView = isInViewport(menuRect);

				if (!inView) {
					const height = menuRect.height + buttonRef.current.clientHeight + 10;
					menuRef.current.style.marginTop = `-${height}px`;
				}
			}
		}
		setMenuExpanded((prev) => !prev);
	};

	return (
		<div css={dropdownButtonStyle} ref={componentRef}>
			<button
				aria-controls={id ? `${id}-listbox` : undefined}
				aria-expanded={menuExpanded ? 'true' : 'false'}
				aria-haspopup="true"
				css={[buttonStyle, menuExpanded && expandedButtonStyle]}
				id={id}
				onClick={toggleMenuExpanded}
				ref={buttonRef}
				type="button"
			>
				<span>{text}</span>
				<CaretDownIcon />
			</button>
			<ul
				aria-label={`${text} menu`}
				css={[menuStyle, menuExpanded && visibleMenuStyle]}
				id={id ? `${id}-listbox` : undefined}
				ref={menuRef}
				role="listbox"
			>
				{menu.map((item) => (
					<li key={item.text}>
						<button
							css={menuItemStyle}
							disabled={item.disabled}
							onClick={() => {
								item.onClick();
								setMenuExpanded(false);
							}}
							type="button"
						>
							{item.text}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default React.memo(DropdownButton);
