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

declare global {
	interface HTMLElementTagNameMap {
		'my-tab-group': MyTabGroup;
	}
}

export class MyTabGroup extends HTMLElement {
	static define(tag = 'my-tab-group') {
		if (!customElements.get(tag)) {
			customElements.define(tag, MyTabGroup);
		}
	}

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
	get activeTabName(): string {
		return this.getAttribute('active-tab') ?? '';
	}
	set activeTabName(name: string) {
		this.setAttribute('active-tab', name);
	}
	static observedAttributes = ['active-tab'];
	attributeChangedCallback(name: 'active-tab', oldVal: string, val: string) {
		switch (name) {
			case 'active-tab': {
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
				this.activeTabName = e.target.panel;
			}
		});

		this.addEventListener('keydown', e => {
			if (!(e.target instanceof MyTab)) return;
			const { code } = e;
			if (code === 'ArrowLeft' || code === 'KeyA') this.toLeft();
			if (code === 'ArrowRight' || code === 'KeyD') this.toRight();
		});

		if (!this.activeTabName) {
			if (this.tabs) {
				this.activeTabName = this.tabs[0].panel;
			}
		}
	}

	#switchTab(currentPanelName: string, direction: 'left' | 'right'): void {
		const tabs = this.tabs;
		if (!tabs) {
			console.warn('no tabs to switch');
			return;
		}

		const currentTabIndex = tabs.findIndex(tab => tab.panel === currentPanelName);
		if (currentTabIndex === -1) return;

		const minIndex = 0;
		const maxIndex = tabs.length - 1;

		let newIndex;
		switch (direction) {
			case 'left':
				newIndex = currentTabIndex === minIndex ? maxIndex : currentTabIndex - 1;
				break;
			case 'right':
				newIndex = currentTabIndex === maxIndex ? minIndex : currentTabIndex + 1;
				break;
			default:
				throw new Error('invalid case');
		}

		const newTab = tabs[newIndex];
		newTab.focus();
		this.activeTabName = newTab.panel;
	}

	toRight() {
		if (this.activeTabName) this.#switchTab(this.activeTabName, 'right');
	}

	toLeft() {
		if (this.activeTabName) this.#switchTab(this.activeTabName, 'left');
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
