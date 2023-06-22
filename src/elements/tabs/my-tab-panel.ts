declare global {
	interface HTMLElementTagNameMap {
		'my-tab-panel': MyTabPanel;
	}
}

export class MyTabPanel extends HTMLElement {
	static define(tag = 'my-tab-panel') {
		if (!customElements.get(tag)) {
			customElements.define(tag, MyTabPanel);
		}
	}

	get name() {
		return this.getAttribute('name') ?? '';
	}

	set name(val: string) {
		this.setAttribute('name', val);
	}

	set active(val: boolean) {
		val ? this.setAttribute('active', '') : this.removeAttribute('active');
	}
	get active() {
		return this.hasAttribute('active');
	}
	static template = String.raw`
            <style>
                :host(:not([active])) {
                    display: none;
                }
            </style>
            <slot></slot>
        `;
	connectedCallback() {
		this.attachShadow({ mode: 'open' }).innerHTML = MyTabPanel.template;
	}
}
