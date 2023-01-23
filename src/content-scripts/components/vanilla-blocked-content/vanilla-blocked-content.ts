import { BlockedContentProps, PostOrQuote, PostStyle } from '../../../types';
export { IconBlockedUser } from '../icons/icon-blocked-user';
export { IconMonkey } from '../icons/icon-monkey';
import { html, render } from 'lit';

export const css = new CSSStyleSheet();
import styles from './styles.css?inline';
css.replaceSync(styles);

export class VanillaBlockedContent extends HTMLElement {
	kind: PostOrQuote;
	postStyle: PostStyle;
	userTooltip: string;
	keywordTooltip: string;
	conditions: {
		text: boolean;
		icon: boolean;
		userIcon: boolean;
		keywordIcon: boolean;
	};

	get tooltip(): string {
		return [this.userTooltip, this.keywordTooltip].filter(s => s.length > 0).join('   |   ');
	}
	constructor(props?: BlockedContentProps) {
		super();

		this.kind = (props?.kind ?? this.getAttribute('kind') ?? 'post') as PostOrQuote;
		this.postStyle = (props?.postStyle ?? this.getAttribute('post-style') ?? 'normal') as PostStyle;
		this.userTooltip = props?.userTooltip ?? this.getAttribute('user-tooltip') ?? '';
		this.keywordTooltip = props?.keywordTooltip ?? this.getAttribute('keyword-tooltip') ?? '';

		const element = this;
		this.conditions = {
			get text() {
				return element.postStyle === 'full' && element.kind !== 'quote';
			},
			get icon() {
				return element.postStyle === 'normal' || element.postStyle === 'full';
			},
			get userIcon() {
				return element.conditions.icon && element.userTooltip.length > 0;
			},
			get keywordIcon() {
				return element.conditions.icon && element.keywordTooltip.length > 0;
			},
		};
	}

	static get observedAttributes() {
		return ['kind', 'user-tooltip', 'keyword-tooltip', 'post-style'];
	}

	attributeChangedCallback(
		name: 'kind' | 'user-tooltip' | 'keyword-tooltip' | 'post-style',
		oldVal: string,
		val: string
	) {
		console.log(`attributeChangedCallback(${name}, ${oldVal}, ${val})`);
		switch (name) {
			case 'kind':
				if (val !== 'post' && val !== 'quote') return;
				this.kind = val;

				const button = this.shadowRoot?.querySelector('button');
				if (!button) return;
				console.log(`SHOW`);
				button.innerText = `show ${val}`;
				break;
			case 'user-tooltip':
				if (!this.conditions.icon) return;
				if (val.length) {
					let userIcon = this.shadowRoot?.querySelector('icon-blocked-user');
					if (!userIcon) {
						userIcon = document.createElement('icon-blocked-user');
						this.shadowRoot?.prepend(userIcon);
					}

					userIcon.title = val;
				} else {
					this.shadowRoot?.querySelector('icon-blocked-user')?.remove();
				}
				break;
			case 'keyword-tooltip':
				if (!this.conditions.icon) return;
				if (val.length) {
					let icon = this.shadowRoot?.querySelector('icon-monkey');
					if (!icon) {
						icon = document.createElement('icon-monkey');
						this.shadowRoot?.prepend(icon);
					}

					icon.title = val;
				} else {
					this.shadowRoot?.querySelector('icon-monkey')?.remove();
				}
				break;
			case 'post-style':
				if (val === 'min' || val === 'strict' || val === 'normal' || val === 'full' || val === 'none') {
					this.postStyle = val;
				}
				break;
		}
	}

	connectedCallback() {
		console.log('CONNECTED CALLBACK');
		const sr = this.attachShadow({ mode: 'open' });
		sr.adoptedStyleSheets = [css];
		this.setAttribute('kind', this.kind);
		this.setAttribute('post-style', this.postStyle);

		const blockedUserIcon = html`<icon-blocked-user
			title="${this.userTooltip}"
			width="35"
			height="35"
		></icon-blocked-user>`;

		const keywordIcon = html`<icon-monkey title="${this.keywordTooltip}" width="28" height="28"></icon-monkey>`;

		const icons = html`<div class="icons">
			${this.conditions.userIcon ? blockedUserIcon : ''} ${this.conditions.keywordIcon ? keywordIcon : ''}
		</div>`;

		const markup = html`
			${this.conditions.userIcon || this.conditions.keywordIcon ? icons : ''}
			${this.conditions.text ? html`<p class="text">Blocked user</p>` : ''}
			<button title=${this.tooltip} type="button" class="button">show ${this.kind}</button>
		`;
		render(markup, sr);

		const button = sr.querySelector('button') as HTMLButtonElement;
		button.addEventListener('click', () => {
			this.remove();
			this.dispatchEvent(new Event('button-clicked', { composed: true, bubbles: true }));
		});
	}
}

customElements.define('vanilla-blocked-content', VanillaBlockedContent);
declare global {
	interface HTMLElementTagNameMap {
		'vanilla-blocked-content': VanillaBlockedContent;
	}
}
