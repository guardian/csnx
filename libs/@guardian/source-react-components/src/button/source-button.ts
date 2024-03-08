import './styles.css';

const template = document.createElement('template');
template.innerHTML = `
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
