import { BlockedContentProps, PostOrQuote, PostStyle } from '../../../types';

// polyfill https://bugs.chromium.org/p/chromium/issues/detail?id=390807
import '@webcomponents/custom-elements';

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
		const tooltip =
			[this.userTooltip, this.keywordTooltip]
				.filter(s => s.length > 0)
				.join('   |   ')
				.replaceAll(' ', '&nbsp') ?? 'Reveal content';
		return tooltip;
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
		this.setAttribute('kind', this.kind);
		this.setAttribute('post-style', this.postStyle);
		const blockedUserIcon = `<svg class="text"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					aria-hidden="true"
					role="img"
					width="35"
					height="35"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 24 24"
				>
				<title>${this.userTooltip}</title>
					<path
						d="M10 4a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m0 2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0 7c-2.67 0-8 1.33-8 4v3h9.5a6.5 6.5 0 0 1-.47-1.9H3.9V17c0-.64 3.13-2.1 6.1-2.1c.5 0 1 .05 1.5.13a6.5 6.5 0 0 1 1.05-1.74C11.61 13.1 10.71 13 10 13m7.5 0C15 13 13 15 13 17.5s2 4.5 4.5 4.5s4.5-2 4.5-4.5s-2-4.5-4.5-4.5m0 1.5c1.66 0 3 1.34 3 3c0 .56-.15 1.08-.42 1.5L16 14.92c.42-.27.94-.42 1.5-.42M14.92 16L19 20.08c-.42.27-.94.42-1.5.42c-1.66 0-3-1.34-3-3c0-.56.15-1.08.42-1.5z"
						fill="currentColor"
					/>
			</svg>`;
		const keywordIcon = `
	<svg width="28" height="28" viewBox="0 0 36 36">
		<title>${this.keywordTooltip}</title>
		<ellipse cx="5.801" cy="17" fill="#D79E84" rx="3.678" ry="5.335" transform="rotate(-14.3 5.8 17)" />
		<ellipse cx="30.199" cy="17" fill="#D79E84" rx="5.335" ry="3.678" transform="rotate(-75.7 30.2 17)" />
		<path
			fill="#BF6952"
			d="M18.985 35h-1.97c-6.5 0-12.803-4.982-12.803-11.956c0-3.985 1.477-5.978 1.477-5.978s-.492-1.993-.492-3.985C5.197 7.103 11.5 2.121 18 2.121c6.5 0 12.803 5.978 12.803 10.96c0 1.993-.492 3.985-.492 3.985s1.477 1.993 1.477 5.978C31.788 30.018 25.485 35 18.985 35z"
		/>
		<path
			fill="#D79E84"
			d="M29.667 15.379a6.895 6.895 0 0 0-6.894-6.894A6.87 6.87 0 0 0 18 10.411a6.865 6.865 0 0 0-4.773-1.926a6.895 6.895 0 0 0-6.894 6.894a6.881 6.881 0 0 0 2.882 5.599a10.532 10.532 0 0 0-.761 3.946c0 5.565 4.274 9.015 9.545 9.015s9.545-3.45 9.545-9.015c0-1.401-.272-2.734-.761-3.946a6.878 6.878 0 0 0 2.884-5.599z"
		/>
		<ellipse cx="13" cy="17" fill="#292F33" rx="2" ry="3" />
		<ellipse cx="23" cy="17" fill="#292F33" rx="2" ry="3" />
		<path
			fill="#642116"
			d="M18 31.5c2.715 0 5.027-1.38 5.895-3.309c.359-.798-.25-1.691-1.157-1.691h-9.476c-.907 0-1.516.893-1.157 1.691c.868 1.929 3.18 3.309 5.895 3.309z"
		/>
		<ellipse cx="16.5" cy="22" fill="#642116" rx="1" ry="1.061" />
		<circle cx="19.5" cy="22" r="1" fill="#642116" />
		<path
			fill="#BF6952"
			d="M22.242.17s-5.303-1.061-7.424 2.121s4.242 1.061 4.242 1.061S20.121.17 22.242.17zM36 36l-14-4l3-6l11 2zM0 36l14-4l-3-6l-11 2z"
		/>
		<path
			fill="#D79E84"
			d="M12.369 25.001s.118-1.26.094-2.719c-.031-1.906-2.582-2.852-3.375-1.062c-.969 2.188-2.188 7.438-1.469 9.656s2.531 3.969 6.594 3.844s7.594-.906 8.688-1.594s.845-2.378-.406-2.656c-1.125-.25-4.219.25-4.219.25s3.253-.694 4.156-1.281c1.25-.812.562-2.594-.656-2.625c-1.202-.031-4.188.469-4.188.469s2.844-.75 3.75-1.531c.895-.771.562-2.469-1.031-2.531s-6.438.967-7.938 1.78z"
		/>
		<path
			fill="#BF6952"
			d="M13.806 35.227c-3.52 0-5.76-1.411-6.662-4.196c-.806-2.487.56-7.919 1.487-10.013c.418-.946 1.3-1.411 2.297-1.205c.995.201 2.013 1.111 2.035 2.462c.012.744-.011 1.432-.038 1.937c2.056-.774 5.966-1.559 7.401-1.491c.911.036 1.618.522 1.89 1.302a1.947 1.947 0 0 1-.799 2.295c.135-.004.261-.005.371-.003c.803.021 1.498.589 1.731 1.414c.235.834-.077 1.65-.815 2.13a2.17 2.17 0 0 1-.185.107l.083.017a1.882 1.882 0 0 1 1.462 1.546a1.978 1.978 0 0 1-.898 2.021c-1.131.712-4.648 1.539-8.938 1.671c-.143.003-.284.006-.422.006zm-3.318-14.459c-.294 0-.703.111-.943.654c-1.014 2.29-2.093 7.314-1.45 9.3c.796 2.456 2.794 3.616 6.103 3.498c3.912-.12 7.424-.881 8.437-1.517a.976.976 0 0 0 .444-1.006a.885.885 0 0 0-.693-.739c-.848-.188-3.196.121-4.031.255a.5.5 0 0 1-.184-.982c.88-.188 3.312-.771 3.988-1.211c.523-.34.452-.827.397-1.021c-.091-.322-.378-.675-.794-.686c-1.174-.049-4.063.457-4.092.462a.5.5 0 0 1-.21-.977c.76-.201 2.88-.849 3.551-1.427a.944.944 0 0 0 .261-1.021c-.079-.225-.312-.605-.985-.632c-1.452-.06-6.245.944-7.68 1.721a.502.502 0 0 1-.737-.486c.001-.012.115-1.251.092-2.664a1.56 1.56 0 0 0-1.234-1.498a1.257 1.257 0 0 0-.24-.023z"
		/>
		<path
			fill="#D79E84"
			d="M23.631 25.001s-.118-1.26-.094-2.719c.031-1.906 2.582-2.852 3.375-1.062c.969 2.188 2.188 7.438 1.469 9.656s-2.531 3.969-6.594 3.844s-7.594-.906-8.688-1.594s-.845-2.378.406-2.656c1.125-.25 4.219.25 4.219.25s-3.253-.694-4.156-1.281c-1.25-.812-.562-2.594.656-2.625c1.202-.031 4.188.469 4.188.469s-2.844-.75-3.75-1.531c-.895-.771-.562-2.469 1.031-2.531s6.438.967 7.938 1.78z"
		/>
		<path
			fill="#BF6952"
			d="M22.194 35.227c-.139 0-.279-.003-.423-.007c-4.29-.132-7.807-.959-8.938-1.671a1.978 1.978 0 0 1-.897-2.021a1.88 1.88 0 0 1 1.461-1.546l.083-.017a2.501 2.501 0 0 1-.184-.107c-.739-.479-1.051-1.296-.815-2.13c.233-.825.929-1.394 1.731-1.414c.111-.002.236-.001.371.003a1.951 1.951 0 0 1-.8-2.295c.272-.779.979-1.266 1.89-1.302c1.433-.049 5.346.718 7.401 1.491a29.057 29.057 0 0 1-.038-1.937c.022-1.35 1.04-2.261 2.034-2.462c1.004-.206 1.879.259 2.298 1.205c.928 2.094 2.293 7.525 1.487 10.013c-.901 2.785-3.141 4.196-6.661 4.197zm-7.824-4.329c-.304 0-.567.018-.755.06a.885.885 0 0 0-.693.739a.975.975 0 0 0 .444 1.006c1.012.636 4.525 1.396 8.437 1.517c3.3.101 5.308-1.042 6.103-3.498c.644-1.985-.437-7.01-1.45-9.3c-.319-.72-.933-.681-1.185-.63a1.559 1.559 0 0 0-1.233 1.498c-.022 1.413.091 2.652.092 2.665a.498.498 0 0 1-.223.463a.497.497 0 0 1-.514.022c-1.435-.776-6.187-1.786-7.68-1.721c-.674.026-.907.407-.985.632a.945.945 0 0 0 .261 1.021c.671.579 2.791 1.227 3.551 1.427a.5.5 0 0 1-.211.977c-.03-.005-2.962-.493-4.092-.462c-.416.011-.704.363-.795.686a.88.88 0 0 0 .398 1.021c.677.439 3.108 1.023 3.988 1.211a.5.5 0 0 1-.184.982c-.648-.106-2.213-.316-3.274-.316z"
		/>
		<path
			fill="#9B3C07"
			d="M9.643 21.265c-.29-.199-.561-.403-.809-.613a2.384 2.384 0 0 0-.204.366c-.532 1.201-1.203 3.497-1.531 5.708l-2.148.45l2.998.879l.155-1.268c.296-1.973.875-4.091 1.439-5.365c.03-.065.068-.104.1-.157zm19.273 5.558c-.322-2.24-1.007-4.587-1.547-5.805a2.268 2.268 0 0 0-.216-.381c-.254.216-.516.424-.789.624c.031.051.063.1.091.161c.688 1.554 1.405 4.366 1.594 6.634l3.021-.88l-2.154-.353z"
		/>

	</svg>
		`;

		const sr = this.attachShadow({ mode: 'closed' });

		sr.adoptedStyleSheets = [css];

		const icons = String.raw`
			<div class="icons">
				${this.conditions.userIcon ? blockedUserIcon : ''}
				${this.conditions.keywordIcon ? keywordIcon : ''}
			</div>`;

		sr.innerHTML = String.raw`
			${this.conditions.userIcon || this.conditions.keywordIcon ? icons : ''}
			${this.conditions.text ? '<p class="text">Blocked user</p>' : ''}
			<button title=${this.tooltip} type="button" class="button">show ${this.kind}</button>
		`;

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
