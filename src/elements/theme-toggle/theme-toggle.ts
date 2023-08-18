import { Option } from '../../types';
import styles from './styles.css?inline';
const css = new CSSStyleSheet();
css.replaceSync(styles);

import sunmoonStyles from './sunmoon.css?inline';
import { template as themeToggleTemplate } from './template';
const sunmoonCss = new CSSStyleSheet();
sunmoonCss.replaceSync(sunmoonStyles);

type ColorTheme = 'light' | 'dark';

const themeUtils = Object.freeze({
	LOCAL_STORAGE_KEY: 'theme-preference',
	getSystemPreference(): ColorTheme {
		return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
	},
	getStorageValue(): Option<string> {
		return localStorage.getItem(this.LOCAL_STORAGE_KEY);
	},

	getTheme(): ColorTheme {
		const storagePreference = this.getStorageValue();
		if (!storagePreference) {
			// return this.getSystemPreference();
			return 'dark';
		}

		if (storagePreference !== 'dark' && storagePreference !== 'light') return 'dark';
		return storagePreference;
	},

	addRootThemeAttr(theme: ColorTheme): void {
		document.documentElement.setAttribute('data-theme', theme);
	},

	setStorageValue(val: ColorTheme): void {
		localStorage.setItem(this.LOCAL_STORAGE_KEY, val);
	},
});

export class ThemeToggle extends HTMLElement {
	static define(tag = 'theme-toggle') {
		if (!customElements.get(tag)) {
			customElements.define('theme-toggle', ThemeToggle);
		}
	}

	get theme(): ColorTheme {
		const theme = this.getAttribute('theme');
		if (theme !== 'dark' && theme !== 'light') return 'dark';
		return theme;
	}

	set theme(val: ColorTheme) {
		this.setAttribute('theme', val);
	}

	static observedAttributes = ['theme'];
	attributeChangedCallback(name: 'theme', _: Option<string>, val: Option<string>) {
		switch (name) {
			case 'theme':
				if (val !== 'dark' && val !== 'light') return;
				themeUtils.setStorageValue(val);
				document.documentElement.setAttribute('data-theme', val);
				this.$button?.setAttribute('aria-label', val);
		}
	}

	get $button(): Option<HTMLButtonElement> {
		return this.#shadowRoot.querySelector('button');
	}

	#shadowRoot: ShadowRoot;
	constructor() {
		super();
		const { shadowRoot } = this.attachInternals();
		if (!shadowRoot) {
			const template = document.createElement('template');
			template.innerHTML = themeToggleTemplate;

			this.#shadowRoot = this.attachShadow({ mode: 'open' });
			this.#shadowRoot.adoptedStyleSheets = [css, sunmoonCss];
			this.#shadowRoot.append(template.content.cloneNode(true));
		} else {
			this.#shadowRoot = shadowRoot;
		}

		this.$button?.addEventListener('click', this.toggleTheme.bind(this));
	}
	connectedCallback() {
		this.theme = themeUtils.getTheme();
	}

	toggleTheme(): void {
		this.theme = this.theme === 'dark' ? 'light' : 'dark';
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'theme-toggle': ThemeToggle;
	}
}
