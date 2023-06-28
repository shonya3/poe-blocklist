import { LitElement, css, html } from 'lit';

declare global {
	interface HTMLElementTagNameMap {
		'my-popover': MyPopoverElement;
	}
}

export class MyPopoverElement extends LitElement {
	static define(tag = 'my-popover') {
		if (!customElements.get(tag)) {
			customElements.define(tag, MyPopoverElement);
		}
	}
	static styles = css`
		:host {
			display: block;
			width: max-content;
			color: black;
			background-color: #eee;
			box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
				rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
		}
		.close-btn {
			margin: 0;
			padding: 0;
			cursor: pointer;
			border: none;
			background: none;
			position: absolute;
			right: 0.15rem;
			top: 0.15rem;
			filter: grayscale();
		}

		#my-popover {
			background-color: inherit;
			color: inherit;
			padding: 1rem;
			line-height: 1.4;
			position: relative;
		}

		#my-popover::before {
			content: '';
			display: block;
			position: absolute;
			top: 12%;
			left: 0;
			width: 6px;
			height: 10px;
			background-color: inherit;
			clip-path: polygon(0 50%, 100% 0, 100% 100%);
			transform: translateX(-100%);
		}
	`;
	override render() {
		return html`
			<div id="my-popover">
				<button title="close" class="close-btn">❌</button>
				<p>
					<slot>I am a popover with more information.</slot>
				</p>
			</div>
		`;
	}
}
