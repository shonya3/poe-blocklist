export class IconBlockedUser extends HTMLElement {
	constructor() {
		super();
		const template = document.createElement('template');
		template.innerHTML = `
                    <style>
                        :host{
                            display: inline-block;
                            width: 1.33em;
                            height: 1.33em;
                            contain: strict;
                            box-sizing: content-box !important;
                        }

                        svg{
                            display: block;
                            height: 100%;
                            width: 100%;
                        }
                    </style>
                    <svg class="text"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					aria-hidden="true"
					role="img"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 24 24"
				>
				<title></title>
					<path
						d="M10 4a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m0 2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0 7c-2.67 0-8 1.33-8 4v3h9.5a6.5 6.5 0 0 1-.47-1.9H3.9V17c0-.64 3.13-2.1 6.1-2.1c.5 0 1 .05 1.5.13a6.5 6.5 0 0 1 1.05-1.74C11.61 13.1 10.71 13 10 13m7.5 0C15 13 13 15 13 17.5s2 4.5 4.5 4.5s4.5-2 4.5-4.5s-2-4.5-4.5-4.5m0 1.5c1.66 0 3 1.34 3 3c0 .56-.15 1.08-.42 1.5L16 14.92c.42-.27.94-.42 1.5-.42M14.92 16L19 20.08c-.42.27-.94.42-1.5.42c-1.66 0-3-1.34-3-3c0-.56.15-1.08.42-1.5z"
						fill="currentColor"
					/>
			</svg>`;
		const root = this.attachShadow({ mode: 'open' });
		root.append(template.content.cloneNode(true));
	}
	static get observedAttributes() {
		return ['width', 'height', 'title'];
	}

	get height() {
		return this.$svg.getAttribute('height') ?? '';
	}

	set height(val: string) {
		this.$svg.setAttribute('height', val);
	}

	get width() {
		return this.$svg.getAttribute('width') ?? '';
	}

	set width(val: string) {
		this.$svg.setAttribute('width', val);
	}

	get title() {
		return this.$svgTitle.innerText;
	}

	set title(val: string) {
		this.$svgTitle.innerHTML = val;
	}

	attributeChangedCallback(name: 'width' | 'height' | 'title', oldVal: string, val: string) {
		switch (name) {
			case 'height':
				this.height = val;
				break;
			case 'width':
				this.width = val;
				break;
			case 'title':
				this.title = val;
				break;
		}
	}

	get $svg(): SVGElement {
		const root = this.shadowRoot;
		if (!root) throw new Error('no shadow root');
		const svg = root.querySelector('svg');
		if (!svg) throw new Error('no svg element on root');
		return svg;
	}

	get $svgTitle(): HTMLTitleElement {
		const titleEl = this.$svg.querySelector('title');
		if (!titleEl) throw new Error('no title element on icon element');
		return titleEl;
	}
}

customElements.define('icon-blocked-user', IconBlockedUser);
declare global {
	interface HTMLElementTagNameMap {
		'icon-blocked-user': IconBlockedUser;
	}
}
