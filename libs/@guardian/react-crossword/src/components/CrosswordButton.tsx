import type { ButtonProps as SourceButtonProps } from '@guardian/source/react-components';
import { Button as SourceButton } from '@guardian/source/react-components';
import type { MouseEventHandler } from 'react';
import { memo, useRef, useState } from 'react';

export type CrosswordButtonProps = SourceButtonProps & {
	onClick: MouseEventHandler<HTMLButtonElement>;
	requireConfirmation?: boolean;
};

const ButtonComponent = ({
	children,
	requireConfirmation = false,
	onClick: userOnClick,
	...props
}: CrosswordButtonProps) => {
	const [isConfirming, setIsConfirming] = useState<boolean>(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
		if (!requireConfirmation) {
			userOnClick(event);
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
		userOnClick(event);
		setIsConfirming(false);
	};

	return (
		<SourceButton onClick={handleClick} size="small" {...props}>
			{isConfirming && 'Confirm '}
			{children}
		</SourceButton>
	);
};

export const CrosswordButton = memo(ButtonComponent);
