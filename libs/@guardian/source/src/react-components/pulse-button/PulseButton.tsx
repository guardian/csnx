// import { css } from '@emotion/react';
import { PulseContext } from '@guardian/pulse';
import { useContext, type ButtonHTMLAttributes } from 'react';
import { buttonStyles, type ButtonStyleProps } from './styles';

export interface ButtonProps
	extends
		Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'>,
		ButtonStyleProps {}

/**
 * Buttons enable users to make choices or perform actions.
 */
export const PulseButton = ({
	style,
	priority,
	children,
	...props
}: ButtonProps) => {
	const pulse = useContext(PulseContext);
	return (
		<button
			css={buttonStyles({ style, priority })}
			data-brand={pulse.theme}
			data-mode={pulse.mode}
			{...props}
		>
			{children}
		</button>
	);
};
