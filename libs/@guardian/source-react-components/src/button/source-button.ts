import './styles.css';

const template = document.createElement('template');
template.innerHTML = `
	<style>
		:root {
			/* TODO: Add transitions to design tokens */
			--source-transitions-short: 0.2s cubic-bezier(0.64, 0.57, 0.67, 1.53);
			--source-transitions-medium: 0.3s ease-in-out;

			/* Default Theme */
			--source-button-text-primary: var(--source-palette-neutral-100);
			--source-button-background-primary: var(--source-palette-brand-400);
			--source-button-background-primary-hover: #234b8a;
			--source-button-text-secondary: var(--source-palette-brand-400);
			--source-button-background-secondary: var(--source-palette-brand-800);
			--source-button-background-secondary-hover: #acc9f7;
			--source-button-text-tertiary: var(--source-palette-brand-400);
			--source-button-background-tertiary-hover: #e5e5e5;
			--source-button-border-tertiary: var(--source-palette-brand-400);
			--source-button-text-subdued: var(--source-palette-brand-400);
		}

		/*
		 * Base button styles
		 */

		:host button {
			display: inline-flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			border: none;
			cursor: pointer;
			transition: var(--source-transitions-medium);
			text-decoration: none;
			white-space: nowrap;
			vertical-align: middle;
			font-family: var(--source-typography-textSans-medium-font-family);
			font-size: var(--source-typography-textSans-medium-font-size);
			line-height: var(--source-typography-textSans-medium-line-height);
			font-weight: var(--source-typography-fontWeight-bold);
			color: var(--source-button-text-primary);
			background-color: var(--source-button-background-primary);
			height: var(--source-height-ctaMedium);
			min-height: var(--source-height-ctaMedium);
			border-radius: var(--source-height-ctaMedium);
			padding: 0 var(--source-space-5);
			padding-bottom: 2px;

			&.small {
				font-family: var(--source-typography-textSans-medium-font-family);
				font-size: var(--source-typography-textSans-medium-font-size);
				line-height: var(--source-typography-textSans-medium-line-height);
				font-weight: var(--source-typography-fontWeight-bold);
				height: var(--source-height-ctaSmall);
				min-height: var(--source-height-ctaSmall);
				border-radius: var(--source-height-ctaSmall);
				padding: 0 var(--source-space-4);
				padding-bottom: 2px;
			}

			&.xsmall {
				font-family: var(--source-typography-textSans-xSmall-font-family);
				font-size: var(--source-typography-textSans-xSmall-font-size);
				line-height: var(--source-typography-textSans-xSmall-line-height);
				font-weight: var(--source-typography-fontWeight-bold);
				height: var(--source-height-ctaXSmall);
				min-height: var(--source-height-ctaXSmall);
				border-radius: var(--source-height-ctaXSmall);
				padding: 0 var(--source-space-3);
				padding-bottom: 1px;
			}

			&.secondary {
				background-color: var(--source-button-background-secondary);
				color: var(--source-button-text-secondary);
				&:hover {
					background-color: var(--source-button-background-secondary-hover);
				}
			}

			&.tertiary {
				background-color: transparent;
				color: var(--source-button-text-tertiary);
				border: 1px solid var(--source-button-border-tertiary);
				&:hover {
					background-color: var(--source-button-background-tertiary-hover);
				}
			}

			&.subdued {
				padding: 0;
				background-color: transparent;
				color: var(--source-button-text-subdued);
				text-decoration: underline;
				text-underline-offset: 4px;
				border-radius: 0;
				&:hover {
					text-decoration-thickness: 4px;
				}
			}

			&:hover {
				background-color: var(--source-button-background-primary-hover);
			}

			&:focus {
				outline: 0;
				html:not(.src-focus-disabled) & {
					outline: 5px solid var(--source-palette-focus-400);
					outline-offset: 3px;
				}
			}

			&:disabled {
				cursor: not-allowed;
			}
		}
	</style>

	<button>
		<slot></slot>
	</button>
`;

class Button extends HTMLElement {
	connectedCallback() {
		let shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.appendChild(template.content.cloneNode(true));
	}
}

customElements.define('source-button', Button);

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'source-button': SourceButtonProps;
		}
	}
}

interface SourceButtonProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLElement>,
		HTMLElement
	> {}
