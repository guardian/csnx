import { css } from '@emotion/react';
import type { ReactElement, ReactNode } from 'react';
import { cloneElement } from 'react';
import { visuallyHidden } from '../../foundations';
import type { IconProps, IconSize } from '../@types/Icons';
import { Spinner } from '../spinner/Spinner';
import type { Size } from './@types/SharedButtonProps';

const iconSize: Record<Size, IconSize> = {
	xsmall: 'xsmall',
	small: 'small',
	default: 'medium',
};

/**
 * Spinners do not use the same icon sizes so we specify custom sizes in pixels
 */
const spinnerSize: Record<Size, number> = {
	xsmall: 16,
	small: 20,
	default: 24,
};

export const buttonContents = ({
	size = 'default',
	hideLabel,
	iconSvg,
	isLoading,
	children,
}: {
	size?: Size;
	hideLabel?: boolean;
	iconSvg?: ReactElement;
	isLoading?: boolean;
	children: ReactNode;
}) => {
	const contents = [children];

	if (isLoading) {
		if (!hideLabel) {
			contents.push(<div key="space" className="src-button-space" />);
		}
		contents.push(
			<Spinner
				size={spinnerSize[size]}
				theme={{
					background: 'transparent',
					color: 'currentColor',
				}}
				key="spinner"
			/>,
		);
	} else if (iconSvg) {
		if (!hideLabel) {
			contents.push(<div key="space" className="src-button-space" />);
		}
		contents.push(
			cloneElement(iconSvg as ReactElement<IconProps>, {
				size: iconSize[size],
				theme: { fill: 'currentColor' },
				key: 'icon',
			}),
		);
	}
	if (hideLabel) {
		return (
			<>
				<span
					css={css`
						${visuallyHidden};
					`}
				>
					{children}
				</span>
				{contents[1]}
			</>
		);
	} else {
		return contents;
	}
};
