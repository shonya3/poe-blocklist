import { get_user_name, Name } from '../name';

export class Author {
	name: Name;
	#post_element: HTMLElement;
	isGGG: boolean = false;
	constructor(post_element: HTMLElement) {
		this.#post_element = post_element;

		this.name = new Name({
			value: get_user_name(this.name_anchor_element),
			onChange: ({ indiscriminated }) => {
				if (!indiscriminated) {
					return;
				}
				const anchor_element = this.name_anchor_element;
				if (!anchor_element) {
					return;
				}
				anchor_element.textContent = indiscriminated;
			},
		});
	}

	get name_anchor_element(): HTMLAnchorElement | null {
		return this.#post_element.querySelector<HTMLAnchorElement>('span.profile-link.post_by_account > a');
	}

	get is_admin() {
		return this.#post_element.querySelector(':has(.roleLabel.staffText)') !== null;
	}
}
