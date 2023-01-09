import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BlockedContentProps, PostOrQuote, PostStyle } from '../../../types';
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

	conditions: {
		text: boolean;
		icon: boolean;
		userIcon: boolean;
		keywordIcon: boolean;
	};

	get tooltip(): string {
		return [this.userTooltip, this.keywordTooltip].filter(s => Boolean(s)).join('   |   ');
	}

	constructor(props?: BlockedContentProps) {
		super();

		this.kind = props?.kind ?? this.kind;
		this.postStyle = props?.postStyle ?? this.postStyle;
		this.userTooltip = props?.userTooltip ?? this.userTooltip;
		this.keywordTooltip = props?.keywordTooltip ?? this.keywordTooltip;

		const element = this;
		this.conditions = {
			get text() {
				return element.postStyle === 'full' && element.kind !== 'quote';
			},
			get icon() {
				return element.postStyle === 'normal' || element.postStyle === 'full';
			},
			get userIcon() {
				return element.conditions.icon && Boolean(element.userTooltip);
			},
			get keywordIcon() {
				return element.conditions.icon && Boolean(element.keywordTooltip);
			},
		};
	}

	override render() {
		const blockedUserIcon = html`<icon-blocked-user
			title="${this.userTooltip ?? ''}"
			width="35"
			height="35"
		></icon-blocked-user>`;

		const keywordIcon = html`<icon-monkey
			title="${this.keywordTooltip ?? ''}"
			width="28"
			height="28"
		></icon-monkey>`;

		const icons = html`
			<div class="icons">
				${this.conditions.userIcon ? blockedUserIcon : ''} ${this.conditions.keywordIcon ? keywordIcon : ''}
			</div>
		`;
		return html`
			${this.conditions.userIcon || this.conditions.keywordIcon ? icons : ''}
			${this.conditions.text ? html`<p class="text">Blocked user</p>` : ''}
			<button @click=${this.#onButtonClicked} title=${ifDefined(this.tooltip)} type="button" class="button">
				show ${this.kind}
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
