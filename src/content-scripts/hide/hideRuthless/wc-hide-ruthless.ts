import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { SupportedLang } from '../../../types';

declare global {
	interface HTMLElementTagNameMap {
		'wc-hide-ruthless': HideRuthlessElement;
	}
}

export class HideRuthlessElement extends LitElement {
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
			position: absolute;
			top: 0px;
			right: 0px;
		}
	`;

	labelText() {
		if (this.lang === 'ru') {
			return 'Спрятать рутхлесс';
		} else return 'Hide ruthless';
	}

	static define(tag = 'wc-hide-ruthless') {
		if (!customElements.get(tag)) {
			customElements.define(tag, this);
		}
	}
	protected override render() {
		return html`
			<div>
				<label for="hide-ruthless">${this.labelText()}</label>
				<input
					@change=${this.#onCheckboxInput}
					.checked=${this.hide}
					type="checkbox"
					name="hide-ruthless"
					id="hide-ruthless"
				/>
			</div>
		`;
	}
}
