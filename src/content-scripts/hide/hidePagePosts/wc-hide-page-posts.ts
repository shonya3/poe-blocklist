import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { SupportedLang } from '../../../types';

declare global {
	interface HTMLElementTagNameMap {
		'wc-hide-page-posts': HidePagePostsElement;
	}
}

export class HidePagePostsElement extends LitElement {
	@property({ type: Boolean, reflect: true }) hide = false;
	@property({ reflect: true }) lang: SupportedLang = 'ru';

	#onCheckboxInput(e: InputEvent) {
		if (e.target instanceof HTMLInputElement) {
			this.hide = e.target.checked;

			const updHide = new CustomEvent('upd:hide', {
				bubbles: true,
				composed: true,
				detail: this.hide,
			});

			this.dispatchEvent(updHide);
		}
	}

	static styles = css`
		:host {
			display: inline-block;
		}

		div {
			display: flex;
			align-items: center;
			gap: 0.25rem;
		}
	`;

	labelText() {
		if (this.lang === 'ru') {
			return 'Спрятать посты под патчноутами';
		} else return 'Hide first page posts';
	}

	static define(tag = 'wc-hide-page-posts') {
		if (!customElements.get(tag)) {
			customElements.define(tag, this);
		}
	}
	protected override render() {
		return html`
			<div>
				<label for="hide-page-posts">${this.labelText()}</label>
				<input
					@change=${this.#onCheckboxInput}
					.checked=${this.hide}
					type="checkbox"
					name="hide-page-posts"
					id="hide-page-posts"
				/>
			</div>
		`;
	}
}
