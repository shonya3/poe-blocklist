import { MyTab } from './my-tab';
import { MyTabPanel } from './my-tab-panel';
import type { Option } from '../../types';
import { nextTick } from '../../lib';

const markup = String.raw`
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

export class MyTabGroup extends HTMLElement {
	get tabs(): Option<MyTab[]> {
		const navSlot = this.shadowRoot?.querySelector('slot[name="nav"]');
		if (!(navSlot instanceof HTMLSlotElement)) return null;
		return Array.from(navSlot.assignedElements()).filter(e => e instanceof MyTab) as MyTab[];
	}

	get panels(): Option<MyTabPanel[]> {
		const slot = this.shadowRoot?.querySelector('slot:not([name])');
		if (!(slot instanceof HTMLSlotElement)) return null;
		return Array.from(slot.assignedElements()).filter(e => e instanceof MyTabPanel) as MyTabPanel[];
	}
	get activeTab(): string {
		return this.getAttribute('active-tab') ?? '';
	}
	set activeTab(name: string) {
		this.setAttribute('active-tab', name);
	}
	static observedAttributes = ['active-tab'];
	attributeChangedCallback(name: 'active-tab', oldVal: string, val: string) {
		switch (name) {
			case 'active-tab': {
				console.log('attributeChanged', name, val);

				if (!oldVal) {
					nextTick().then(() => {
						this.setActiveTab(val);
					});
				} else {
					this.setActiveTab(val);
				}
				break;
			}
		}
	}

	connectedCallback() {
		this.attachShadow({ mode: 'open' }).innerHTML = markup;
		this.addEventListener('click', e => {
			if (e.target instanceof MyTab) {
				this.activeTab = e.target.panel;
			}
		});

		if (!this.activeTab) {
			if (this.tabs) {
				this.activeTab = this.tabs[0].panel;
			}
		}
	}

	#getTab(panel: string): Option<MyTab> {
		return this.tabs?.find(tab => tab.panel === panel) ?? null;
	}

	setActiveTab(panelName: string): void {
		const panel = this.panels?.find(panel => panel.name === panelName);
		if (!panel) {
			console.warn('no panel with name: ', panelName);
			return;
		}

		const tab = this.#getTab(panelName);
		if (!tab) return;

		this.tabs?.forEach(tab => (tab.active = false));
		this.panels?.forEach(panel => (panel.active = false));
		tab.active = true;
		panel.active = true;
	}

	addTab(name: string, tabContent: string, panelContent: string): void {
		this.insertAdjacentHTML(
			'beforeend',
			String.raw`
            <my-tab slot="nav" panel=${name}>${tabContent}</my-tab>
            <my-tab-panel name="${name}">${panelContent}</my-tab-panel>
        `
		);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'my-tab-group': MyTabGroup;
	}
}

customElements.define('my-tab-group', MyTabGroup);
