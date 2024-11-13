import { css } from '@emotion/react';
import type { ButtonProps as SourceButtonProps } from '@guardian/source/react-components';
import { Button as SourceButton } from '@guardian/source/react-components';
import { useRef, useState } from 'react';

type ButtonProps = SourceButtonProps & {
	onSuccess: () => void;
	requireConfirmation?: boolean;
};

export const Button = ({
	children,
	requireConfirmation = false,
	onSuccess,
	...props
}: ButtonProps) => {
	const [confirm, setConfirm] = useState<boolean>(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const onClick = () => {
		if (!requireConfirmation) {
			onSuccess();
			return;
		}
		if (!confirm) {
			setConfirm(true);
			timeoutRef.current = setTimeout(() => setConfirm(false), 3000);
			return;
		}
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		onSuccess();
		setConfirm(false);
	};

	return (
		<SourceButton
			onClick={onClick}
			size="xsmall"
			cssOverrides={css`
				height: 30px;
				flex: 1;
				min-width: 115px;
				max-width: 200px;
			`}
			{...props}
		>
			{confirm && 'Confirm '}
			{children}
		</SourceButton>
	);
};
