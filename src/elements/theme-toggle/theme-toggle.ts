import { Option } from '../../types';
import styles from './styles.css?inline';
const css = new CSSStyleSheet();
css.replaceSync(styles);

import styles2 from './sw.css?inline';
const css2 = new CSSStyleSheet();
css2.replaceSync(styles2);

const themeUtils = {
	LOCAL_STORAGE_KEY: 'theme-preference',
	getSystemPreference() {
		return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
	},
	getStorageValue() {
		return localStorage.getItem(this.LOCAL_STORAGE_KEY);
	},

	getTheme(): 'light' | 'dark' {
		const storagePreference = this.getStorageValue();
		if (!storagePreference) {
			return this.getSystemPreference();
		}

		if (storagePreference !== 'dark' && storagePreference !== 'light') return 'dark';
		return storagePreference;
	},

	addRootThemeAttr(theme: 'light' | 'dark') {
		document.documentElement.setAttribute('data-theme', theme);
	},

	setStorageValue(val: 'dark' | 'light') {
		localStorage.setItem(this.LOCAL_STORAGE_KEY, val);
	},
};

export class ThemeToggle extends HTMLElement {
	get theme() {
		const theme = this.getAttribute('theme');
		if (theme !== 'dark' && theme !== 'light') return 'dark';
		return theme;
	}

	set theme(val: 'light' | 'dark') {
		this.setAttribute('theme', val);
	}

	static observedAttributes = ['theme'];
	attributeChangedCallback(name: 'theme', oldVal: Option<string>, val: Option<string>) {
		switch (name) {
			case 'theme':
				if (val !== 'dark' && val !== 'light') return;
				themeUtils.setStorageValue(val);
				document.documentElement.setAttribute('data-theme', val);
				this.$button?.setAttribute('aria-label', val);
		}
	}

	get $button() {
		return this.#shadowRoot.querySelector('button');
	}

	#shadowRoot: ShadowRoot;
	constructor() {
		super();
		const template = document.createElement('template');
		template.innerHTML = String.raw`
            <button
                class="theme-toggle"
                id="theme-toggle"
                title="Toggles light & dark"
                aria-label="auto"
                aria-live="polite"
		    >
                <svg class="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
                    <mask class="moon" id="moon-mask">
                        <rect x="0" y="0" width="100%" height="100%" fill="white" />
                        <circle cx="24" cy="10" r="6" fill="black" />
                    </mask>
                    <circle class="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
                    <g class="sun-beams" stroke="currentColor">
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </g>
                </svg>
		    </button>
        `;

		this.#shadowRoot = this.attachShadow({ mode: 'open' });
		this.#shadowRoot.adoptedStyleSheets = [css, css2];
		this.#shadowRoot.append(template.content.cloneNode(true));
	}
	connectedCallback() {
		this.theme = themeUtils.getTheme();
		this.$button?.addEventListener('click', this.toggleTheme.bind(this));
	}

	toggleTheme() {
		this.theme = this.theme === 'dark' ? 'light' : 'dark';
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'theme-toggle': ThemeToggle;
	}
}

customElements.define('theme-toggle', ThemeToggle);
