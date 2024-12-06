export type OnChange = (args: { discriminated: string | null; indiscriminated: string | null }) => void;

export class Name {
	#value: string | null = null;
	#onChange?: OnChange;

	constructor({ value, onChange }: { value: string | null; onChange?: OnChange }) {
		this.#onChange = onChange;
		if (value) {
			this.#value = value;
			this.change(value);
		}
	}

	get discriminated(): string | null {
		return this.#value;
	}

	get indiscriminated(): string | null {
		if (this.#value === null) {
			return null;
		}
		return indiscriminate(this.#value);
	}

	change(value: string) {
		const has_discriminator = value.indexOf('#') !== -1;
		if (has_discriminator) {
			this.#value = value;
		} else {
			this.#value = `${value}${this.discriminant}`;
		}

		this.#onChange?.({ indiscriminated: this.indiscriminated, discriminated: this.#value });
	}

	/**
	 *  -> #2011
	 */
	get discriminant() {
		const name = this.#value;
		if (name === null) {
			return null;
		}
		const discr_index = name.indexOf('#');
		if (discr_index === -1) {
			return null;
		}

		return name.slice(discr_index);
	}
}

/**
 * Nickname#2000 -> Nickname
 */
export function indiscriminate(name: string): string {
	const discriminator_index = name.indexOf('#');
	if (discriminator_index === -1) {
		return name;
	}

	return name.slice(0, discriminator_index);
}

export function get_user_name(el: HTMLAnchorElement | null) {
	if (!el) {
		return null;
	}

	const last_slash_index = el.href.lastIndexOf('/');
	if (last_slash_index === -1) {
		return null;
	}

	const sliced = el.href.slice(last_slash_index + 1);
	const last_dash_index = sliced.lastIndexOf('-');
	if (!last_dash_index) {
		return null;
	}

	return decodeURI(sliced.slice(0, last_dash_index)) + '#' + decodeURI(sliced.slice(last_dash_index + 1));
}
