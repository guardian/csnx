import { css } from '@emotion/react';
import { PulseProvider } from '@guardian/pulse';
import type { ButtonHTMLAttributes } from 'react';
import { button } from './styles';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- prototype component has no additional props yet
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Buttons enable users to make choices or perform actions.
 */
export const PulseButton = ({ children, ...props }: ButtonProps) => (
	<PulseProvider>
		<section
			css={css`
				display: flex;
				gap: 1rem;
			`}
		>
			<span data-brand="core" data-mode="light">
				<button css={button} {...props}>
					{children}
				</button>
			</span>
			<span data-brand="core" data-mode="dark">
				<button css={button} {...props}>
					{children}
				</button>
			</span>
			<span data-brand="news" data-mode="light">
				<button css={button} {...props}>
					{children}
				</button>
			</span>
			<span data-brand="news" data-mode="dark">
				<button css={button} {...props}>
					{children}
				</button>
			</span>
		</section>
	</PulseProvider>
);
