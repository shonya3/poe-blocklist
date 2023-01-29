import { BlockedContentProps, PostOrQuote, PostStyle } from '../../types';
import { Option } from '../../types';

import '../icons/icon-monkey';
import '../icons/icon-blocked-user';

const hide = (el: HTMLElement) => el.classList.add('hidden');
const unHide = (el: HTMLElement) => el.classList.remove('hidden');

import styles from './styles.css?inline';
const css = new CSSStyleSheet();
css.replaceSync(styles);

export class VanillaContent extends HTMLElement {
	constructor(props?: Partial<BlockedContentProps>) {
		super();

		if (props) {
			Object.assign(this, { ...this, ...props });
		}

		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.adoptedStyleSheets = [css];
		shadowRoot.innerHTML = String.raw`
            <div part="icons">
                <icon-blocked-user></icon-blocked-user>
                <icon-monkey></icon-monkey>
            </div>
            <button part="button"></button>
        `;
		this.addEventListener('click', e => {
			if (e.composedPath()[0] instanceof HTMLButtonElement) {
				this.#onButtonClicked();
			}
		});
	}

	get postStyle(): PostStyle {
		return (this.getAttribute('post-style') as PostStyle) ?? 'normal';
	}

	set postStyle(val: PostStyle) {
		this.setAttribute('post-style', val);
	}

	get kind(): PostOrQuote {
		return (this.getAttribute('kind') as PostOrQuote) ?? 'post';
	}

	set kind(val: PostOrQuote) {
		this.setAttribute('kind', val);
	}

	get userTooltip(): Option<string> {
		return this.getAttribute('user-tooltip');
	}

	set userTooltip(val: Option<string>) {
		if (val) this.setAttribute('user-tooltip', val);
	}

	get keywordTooltip(): Option<string> {
		return this.getAttribute('keyword-tooltip');
	}

	set keywordTooltip(val: Option<string>) {
		if (val) this.setAttribute('keyword-tooltip', val);
	}

	get lang(): 'ru' | 'en' {
		return (this.getAttribute('lang') as 'ru' | 'en') ?? 'en';
	}

	set lang(val: 'ru' | 'en') {
		this.setAttribute('lang', val);
	}

	get withIcons(): boolean {
		return this.hasAttribute('with-icons');
	}

	set withIcons(val: boolean) {
		val ? this.setAttribute('with-icons', '') : this.removeAttribute('with-icons');
	}

	static observedAttributes = ['post-style', 'kind', 'user-tooltip', 'keyword-tooltip', 'lang', 'with-icons'];

	get tooltip(): string {
		return [this.userTooltip, this.keywordTooltip].filter(s => Boolean(s)).join('   |   ');
	}

	get buttonText() {
		switch (this.lang) {
			case 'en': {
				return `show ${this.kind}`;
			}
			case 'ru': {
				return `Показать ${this.kind === 'post' ? 'сообщение' : 'цитату'}`;
			}
		}
	}

	get $iconBlockedUser() {
		return this.shadowRoot?.querySelector('icon-blocked-user')!;
	}

	get $iconMonkey() {
		return this.shadowRoot?.querySelector('icon-monkey')!;
	}

	get $icons(): HTMLElement {
		return this.shadowRoot?.querySelector('[part="icons"]')!;
	}

	get $button(): HTMLButtonElement {
		return this.shadowRoot?.querySelector('button')!;
	}

	attributeChangedCallback(
		name: 'post-style' | 'kind' | 'user-tooltip' | 'keyword-tooltip' | 'lang' | 'with-icons',
		oldVal: Option<string>,
		val: Option<string>
	) {
		switch (name) {
			case 'lang':
				if (!this.$button) return;
				this.$button.textContent = this.buttonText;
				break;
			case 'kind':
				this.$button.textContent = this.buttonText;
				break;
			case 'with-icons':
				const withIcons = typeof val === 'string';
				withIcons ? unHide(this.$icons) : hide(this.$icons);
				break;
			case 'keyword-tooltip':
				if (val) {
					this.$iconMonkey.title = val;
					unHide(this.$iconMonkey);
				}
				if (!val) hide(this.$iconMonkey);
				this.tooltip ? unHide(this.$icons) : hide(this.$icons);
				break;
			case 'user-tooltip':
				console.log('user tooltip', val);
				if (val) {
					this.$iconBlockedUser.title = val;
					unHide(this.$iconBlockedUser);
				}
				if (!val) hide(this.$iconBlockedUser);
				console.log(this.tooltip);
				this.tooltip ? unHide(this.$icons) : hide(this.$icons);
				break;
		}
	}

	connectedCallback() {
		this.#initialRendering();
	}

	#initialRendering() {
		if (!this.withIcons) hide(this.$icons);
		if (!this.keywordTooltip) hide(this.$iconMonkey);
		if (!this.userTooltip) hide(this.$iconBlockedUser);
		if (!this.keywordTooltip && !this.userTooltip) hide(this.$icons);
		this.$button.textContent = this.buttonText;
	}

	#onButtonClicked() {
		this.remove();
		this.dispatchEvent(new Event('button-clicked', { composed: true, bubbles: true }));
	}
}
declare global {
	interface HTMLElementTagNameMap {
		'vanilla-content': VanillaContent;
	}
}

customElements.define('vanilla-content', VanillaContent);
