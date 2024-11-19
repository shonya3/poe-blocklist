export type OnChange = (args: { discriminated: string | null; indiscriminated: string | null }) => void;

export class Name {
	#value: string | null = null;
	#onChange?: OnChange;

	constructor({ value, onChange }: { value: string | null; onChange?: OnChange }) {
		this.#onChange = onChange;
		if (value) {
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
			this.#value = `${value}${this.discriminator}`;
		}

		this.#onChange?.({ indiscriminated: this.indiscriminated, discriminated: this.#value });
	}

	/**
	 *  -> #2011
	 */
	get discriminator() {
		const name = this.#value;
		if (name === null) {
			return null;
		}
		const dicriminator_index = name.indexOf('#');
		if (dicriminator_index === -1) {
			return null;
		}

		return name.slice(dicriminator_index);
	}
}

/**
 * Nickname#2000 -> Nickname
 */
function indiscriminate(name: string): string {
	const discriminator_index = name.indexOf('#');
	if (discriminator_index === -1) {
		return name;
	}

	return name.slice(0, discriminator_index);
}
