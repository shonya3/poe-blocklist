declare global {
	interface HTMLElementTagNameMap {
		'my-tab': MyTab;
	}
}

export class MyTab extends HTMLElement {
	static define(tag = 'my-tab') {
		if (!customElements.get(tag)) {
			customElements.define(tag, MyTab);
		}
	}

	set active(val: boolean) {
		val ? this.setAttribute('active', '') : this.removeAttribute('active');
	}
	get active() {
		return this.hasAttribute('active');
	}

	get panel() {
		return this.getAttribute('panel') ?? '';
	}

	set panel(val: string) {
		this.setAttribute('panel', val);
	}

	focus() {
		this.shadowRoot?.querySelector('button')?.focus();
	}

	static template = String.raw`
            <style>
                button{
					padding: 1rem 2rem;
					border-radius: 0.4rem;
					cursor: pointer;
					transition: 0.2s ease-in;
					transition-property: background-color, color, opacity, filter;
                    border: none;
                    font: inherit;
                }

                :host([active]) button{
                    background-color: #3b82f6;
                    color: #fff;
                }
            </style>
            <button part="button">
                <slot></slot>
            </button>
        `;
	connectedCallback() {
		this.attachShadow({ mode: 'open' }).innerHTML = MyTab.template;
	}
}
