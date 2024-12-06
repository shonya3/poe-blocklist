import { get_user_name, Name } from '../name';

export class Author {
	name: Name;
	#name_anchor_element: HTMLAnchorElement | null;
	constructor(name_anchor_element: HTMLAnchorElement | null) {
		this.#name_anchor_element = name_anchor_element;

		this.name = new Name({
			value: get_user_name(this.#name_anchor_element),
			onChange: ({ indiscriminated }) => {
				if (!indiscriminated) {
					return;
				}
				const anchor_element = this.#name_anchor_element;
				if (!anchor_element) {
					return;
				}
				anchor_element.textContent = indiscriminated;
			},
		});
	}

	get name_anchor_element() {
		return this.#name_anchor_element;
	}
}
