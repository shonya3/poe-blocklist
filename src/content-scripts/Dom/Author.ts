export class Author {
	postElement: HTMLElement;
	name: string;
	isGGG: boolean = false;
	constructor(postElement: HTMLElement, name: string) {
		this.postElement = postElement;
		this.name = name;
		if (this.postElement.querySelector(':has(.roleLabel.staffText)') !== null) {
			this.isGGG = true;
		}
	}
}
