export class Author {
	#post_element: HTMLElement;
	isGGG: boolean = false;
	constructor(post_element: HTMLElement) {
		this.#post_element = post_element;
	}

	get name_anchor_element(): HTMLAnchorElement | null {
		return this.#post_element.querySelector<HTMLAnchorElement>('span.profile-link.post_by_account > a');
	}

	get name(): string | null {
		return this.name_anchor_element?.textContent ?? null;
	}

	set name(name: string) {
		const el = this.name_anchor_element;
		if (!el) {
			return;
		}

		this.name_anchor_element.textContent = name;
	}

	get is_admin() {
		return this.#post_element.querySelector(':has(.roleLabel.staffText)') !== null;
	}
}
