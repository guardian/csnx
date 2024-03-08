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

		.c-source-button {
			display: inline-flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			border: none;
			background: transparent;
			cursor: pointer;
			transition: var(--source-transitions-medium);
			text-decoration: none;
			white-space: nowrap;
			vertical-align: middle;

			&:disabled {
				cursor: not-allowed;
			}

			&:focus {
				outline: 0;
				html:not(.src-focus-disabled) & {
					outline: 5px solid var(--source-palette-focus-400);
					outline-offset: 3px;
				}
			}
		}

		/*
		* Button sizes
		*
		* TODO: These have been copied over as is from the existing styles, but would
		* benefit from refactoring as there's some duplication. The default styles
		* could be moved into the base button styles.
		*
		* The separate icon size styles have been combined with these.
		*/

		.c-source-button--default {
			font-family: var(--source-typography-textSans-medium-font-family);
			font-size: var(--source-typography-textSans-medium-font-size);
			line-height: var(--source-typography-textSans-medium-line-height);
			font-weight: var(--source-typography-fontWeight-bold);
			height: var(--source-height-ctaMedium);
			min-height: var(--source-height-ctaMedium);
			border-radius: var(--source-height-ctaMedium);
			padding: 0 var(--source-space-5);
			padding-bottom: 2px;
			svg {
				flex: 0 0 auto;
				display: block;
				fill: currentColor;
				position: relative;
				width: var(--source-width-iconMedium);
				height: auto;
			}
			.src-button-space {
				width: var(--source-space-3);
			}
		}

		.c-source-button--small {
			font-family: var(--source-typography-textSans-medium-font-family);
			font-size: var(--source-typography-textSans-medium-font-size);
			line-height: var(--source-typography-textSans-medium-line-height);
			font-weight: var(--source-typography-fontWeight-bold);
			height: var(--source-height-ctaSmall);
			min-height: var(--source-height-ctaSmall);
			border-radius: var(--source-height-ctaSmall);
			padding: 0 var(--source-space-4);
			padding-bottom: 2px;
			svg {
				flex: 0 0 auto;
				display: block;
				fill: currentColor;
				position: relative;
				width: var(--source-width-iconSmall);
				height: auto;
			}
			.src-button-space {
				width: var(--source-space-2);
			}
		}

		.c-source-button--xsmall {
			font-family: var(--source-typography-textSans-xSmall-font-family);
			font-size: var(--source-typography-textSans-xSmall-font-size);
			line-height: var(--source-typography-textSans-xSmall-line-height);
			font-weight: var(--source-typography-fontWeight-bold);
			height: var(--source-height-ctaXSmall);
			min-height: var(--source-height-ctaXSmall);
			border-radius: var(--source-height-ctaXSmall);
			padding: 0 var(--source-space-3);
			padding-bottom: 1px;
			svg {
				flex: 0 0 auto;
				display: block;
				fill: currentColor;
				position: relative;
				width: var(--source-width-iconXSmall);
				height: auto;
			}
			.src-button-space {
				width: var(--source-space-1);
			}
		}

		/*
		* Button with icon
		*/

		.c-source-button--icon-left {
			flex-direction: row-reverse;
			svg {
				margin-left: -(var(--source-space-1));
			}
		}

		.c-source-button--icon-right {
			svg {
				margin-right: -(var(--source-space-1));
			}
		}

		.c-source-button--icon-only {
			justify-content: center;
			padding: 0;
			&.c-source-button--default {
				width: var(--source-width-ctaMedium);
			}
			&.c-source-button--small {
				width: var(--source-width-ctaSmall);
			}
			&.c-source-button--xsmall {
				width: var(--source-width-ctaXSmall);
			}
		}

		.c-source-button--icon-nudge {
			svg {
				transform: translate(0, 0);
				transition: var(--source-transitions-short);
			}
			&:hover,
			&:focus {
				svg {
					transform: translate(calc(var(--source-space-1) / 2), 0);
				}
			}
		}

		/*
		* Button priorities
		*/

		.c-source-button--primary {
			background-color: var(--source-button-background-primary);
			color: var(--source-button-text-primary);
			&:hover {
				background-color: var(--source-button-background-primary-hover);
			}
		}

		.c-source-button--secondary {
			background-color: var(--source-button-background-secondary);
			color: var(--source-button-text-secondary);
			&:hover {
				background-color: var(--source-button-background-secondary-hover);
			}
		}

		.c-source-button--tertiary {
			color: var(--source-button-text-tertiary);
			border: 1px solid var(--source-button-border-tertiary);
			&:hover {
				background-color: var(--source-button-background-tertiary-hover);
			}
		}

		.c-source-button--subdued {
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

		/*
		* Loading spinner
		*/

		.c-source-button--loading {
			path,
			circle {
				transition: stroke var(--source-transitions-medium);
				stroke: transparent;
			}
			path {
				stroke: currentColor;
			}
			&.c-source-button--default {
				svg {
					width: 24px;
				}
			}
			&.c-source-button--small {
				svg {
					width: 20px;
				}
			}
			&.c-source-button--xsmall {
				svg {
					width: 16px;
				}
			}
		}
	</style>

	<button class="c-source-button c-source-button--default c-source-button--primary">
		<slot></slot>
	</button>
`;

class Button extends HTMLElement {
	constructor() {
		super();
	}

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
