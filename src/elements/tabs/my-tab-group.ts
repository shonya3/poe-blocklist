import { MyTab } from './my-tab';
import { MyTabPanel } from './my-tab-panel';

export class MyTabGroup extends HTMLElement {
	static template = String.raw`
            <style>
                :host {
					display: block;
					max-width: 1200px;
					font-size: 20px;
				}

				[part='nav'] {
					list-style: none;
					display: flex;
					padding: 0;
					margin-bottom: 10px;
					gap: 10px;
					color: #000;
				}
            </style>
            <nav part="nav">
                <slot name=nav></slot>
            </nav>
            <div part="panels">
                <slot></slot>
            </div>
        `;
	connectedCallback() {
		this.attachShadow({ mode: 'open' }).innerHTML = MyTabGroup.template;
		this.addEventListener('click', e => {
			if (e.target instanceof MyTab) {
				const tab = e.target;
				const panel = this.panels?.find(panel => panel.name === tab.panel);
				if (!panel) {
					console.warn('no panel with name: ', tab.panel);
					return;
				}

				this.tabs?.forEach(tab => (tab.active = false));
				this.panels?.forEach(panel => (panel.active = false));
				tab.active = true;
				panel.active = true;
			}
		});
	}

	get tabs() {
		const navSlot = this.shadowRoot?.querySelector('slot[name="nav"]');
		if (!(navSlot instanceof HTMLSlotElement)) return null;
		return Array.from(navSlot.assignedElements()) as MyTab[];
	}

	get panels() {
		const slot = this.shadowRoot?.querySelector('slot:not([name])');
		if (!(slot instanceof HTMLSlotElement)) return null;
		return Array.from(slot.assignedElements()) as MyTabPanel[];
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'my-tab-group': MyTabGroup;
	}
}

customElements.define('my-tab-group', MyTabGroup);
