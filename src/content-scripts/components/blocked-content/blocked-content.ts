import { BlockedContentProps, PostOrQuote, PostStyle } from '../../../types';
export { IconBlockedUser } from '../icons/icon-blocked-user';
export { IconMonkey } from '../icons/icon-monkey';
import { html, render } from 'lit-html';

export const css = new CSSStyleSheet();
import styles from './styles.css?inline';
css.replaceSync(styles);

export class BlockedContent extends HTMLElement {
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
				return element.postStyle === 'normal' || (element.kind === 'quote' && element.postStyle === 'full');
			},
			get userIcon() {
				return element.conditions.icon && element.userTooltip.length > 0;
			},
			get keywordIcon() {
				return element.conditions.icon && element.keywordTooltip.length > 0;
			},
		};
	}

	connectedCallback() {
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
			${this.conditions.text ? '<p class="text">Blocked user</p>' : ''}
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

customElements.define('blocked-content', BlockedContent);
declare global {
	interface HTMLElementTagNameMap {
		'blocked-content': BlockedContent;
	}
}
