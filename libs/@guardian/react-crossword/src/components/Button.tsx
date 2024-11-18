import type { ButtonProps as SourceButtonProps } from '@guardian/source/react-components';
import { Button as SourceButton } from '@guardian/source/react-components';
import { memo, useRef, useState } from 'react';

type ButtonProps = SourceButtonProps & {
	onSuccess: () => void;
	requireConfirmation?: boolean;
};

export const Button = memo(
	({
		children,
		requireConfirmation = false,
		onSuccess,
		...props
	}: ButtonProps) => {
		const [isConfirming, setIsConfirming] = useState<boolean>(false);
		const timeoutRef = useRef<NodeJS.Timeout | null>(null);

		const onClick = () => {
			if (!requireConfirmation) {
				onSuccess();
				return;
			}
			if (!isConfirming) {
				setIsConfirming(true);
				timeoutRef.current = setTimeout(() => setIsConfirming(false), 3000);
				return;
			}
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			onSuccess();
			setIsConfirming(false);
		};

		return (
			<SourceButton onClick={onClick} size="xsmall" {...props}>
				{isConfirming && 'Confirm '}
				{children}
			</SourceButton>
		);
	},
);
