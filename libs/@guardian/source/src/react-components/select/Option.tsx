import type { OptionHTMLAttributes } from 'react';
import type { SourceComponentProps } from '../@types/SourceComponentProps';

export interface OptionProps
	extends OptionHTMLAttributes<HTMLOptionElement>,
		SourceComponentProps {
	children: string;
}

export const Option = ({ cssOverrides, children, ...props }: OptionProps) => {
	return (
		<option css={cssOverrides} {...props}>
			{children}
		</option>
	);
};
