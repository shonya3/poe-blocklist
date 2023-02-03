import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BlockedContentProps, PostOrQuote, PostStyle } from '../../types';
import { styles } from './styles';

import '../icons/icon-monkey';
import '../icons/icon-blocked-user';

@customElement('blocked-content')
export class BlockedContent extends LitElement {
	static styles = styles;

	/** Visual style of element rendering */
	@property({ reflect: true, type: String, attribute: 'post-style' })
	postStyle: PostStyle = 'normal';

	@property({ reflect: true, type: String })
	kind: PostOrQuote = 'quote';

	@property({ reflect: true, type: String, attribute: 'user-tooltip' })
	userTooltip: string | null = null;

	@property({ reflect: true, type: String, attribute: 'keyword-tooltip' })
	keywordTooltip: string | null = null;

	@property({ reflect: true, type: String, attribute: 'lang' })
	lang: 'ru' | 'en' = 'en';

	@property({ reflect: true, type: Boolean, attribute: 'with-icons' })
	withIcons: boolean = false;

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

	constructor(props?: Partial<BlockedContentProps>) {
		super();

		if (props) {
			Object.assign(this, { ...this, ...props });
		}
	}

	override render() {
		const blockedUserIcon = html`<icon-blocked-user title="${this.userTooltip ?? ''}"></icon-blocked-user>`;

		const keywordIcon = html`<icon-monkey title="${this.keywordTooltip ?? ''}"></icon-monkey>`;

		const icons = html`
			<div part="icons">${this.userTooltip ? blockedUserIcon : ''} ${this.keywordTooltip ? keywordIcon : ''}</div>
		`;

		return html`
			${this.withIcons && this.tooltip ? icons : ''}
			<button part="button" @click=${this.#onButtonClicked} title=${ifDefined(this.tooltip)} type="button">
				${this.buttonText}
			</button>
		`;
	}

	#onButtonClicked() {
		this.remove();
		this.dispatchEvent(new Event('button-clicked', { composed: true, bubbles: true }));
	}
}
declare global {
	interface HTMLElementTagNameMap {
		'blocked-content': BlockedContent;
	}
}
