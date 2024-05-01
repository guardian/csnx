import type { JSX } from '@emotion/react/jsx-runtime';
import type { OptionHTMLAttributes } from 'react';
import type { Props } from '../@types/Props';

export interface OptionProps
	extends OptionHTMLAttributes<HTMLOptionElement>,
		Props {
	children: string;
}

export const Option = ({
	cssOverrides,
	children,
	...props
}: OptionProps): JSX.Element => {
	return (
		<option css={cssOverrides} {...props}>
			{children}
		</option>
	);
};
