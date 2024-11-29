import type { ButtonProps as SourceButtonProps } from '@guardian/source/react-components';
import { Button as SourceButton } from '@guardian/source/react-components';
import type { MouseEventHandler } from 'react';
import { memo, useRef, useState } from 'react';

type ButtonProps = SourceButtonProps & {
	onSuccess: MouseEventHandler<HTMLButtonElement>;
	requireConfirmation?: boolean;
};

const ButtonComponent = ({
	children,
	requireConfirmation = false,
	onSuccess,
	...props
}: ButtonProps) => {
	const [isConfirming, setIsConfirming] = useState<boolean>(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
		if (!requireConfirmation) {
			onSuccess(event);
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
		onSuccess(event);
		setIsConfirming(false);
	};

	return (
		<SourceButton onClick={onClick} size="xsmall" {...props}>
			{isConfirming && 'Confirm '}
			{children}
		</SourceButton>
	);
};

export const Button = memo(ButtonComponent);
