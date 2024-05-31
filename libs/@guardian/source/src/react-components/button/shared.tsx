import { css } from '@emotion/react';
import type { ReactElement, ReactNode } from 'react';
import { cloneElement } from 'react';
import { visuallyHidden } from '../../foundations';
import { Spinner } from '../spinner/Spinner';

export const buttonContents = ({
	hideLabel,
	iconSvg,
	isLoading,
	children,
}: {
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
			cloneElement(
				<Spinner
					theme={{
						strokeBackground: 'transparent',
						strokeForeground: 'currentColor',
					}}
				/>,
				{
					key: 'svg',
				},
			),
		);
	} else if (iconSvg) {
		if (!hideLabel) {
			contents.push(<div key="space" className="src-button-space" />);
		}
		contents.push(cloneElement(iconSvg, { key: 'svg' }));
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
