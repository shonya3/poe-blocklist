declare global {
	interface HTMLElementTagNameMap {
		'icon-unblock-user': IconUnblockUser;
	}
}

export class IconUnblockUser extends HTMLElement {
	static define(tag = 'icon-unblock-user') {
		if (!customElements.get(tag)) {
			customElements.define(tag, IconUnblockUser);
		}
	}

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
				        fill="currentColor"
				        d="M10 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0-6a2 2 0 1 1 0 4c-1.11 0-2-.89-2-2s.9-2 2-2m2 14H2v-3c0-2.67 5.33-4 8-4c.91 0 2.13.16 3.35.47c-.09.33-.15.68-.15 1.03v.89c-.98-.29-2.1-.49-3.2-.49c-2.97 0-6.1 1.46-6.1 2.1v1.1H12V20m8.8-3h-4.3v-2.5c0-.8.7-1.3 1.5-1.3s1.5.5 1.5 1.3v.5h1.3v-.5c0-1.4-1.4-2.5-2.8-2.5s-2.8 1.1-2.8 2.5V17c-.6 0-1.2.6-1.2 1.2v3.5c0 .7.6 1.3 1.2 1.3h5.5c.7 0 1.3-.6 1.3-1.2v-3.5c0-.7-.6-1.3-1.2-1.3Z"
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
