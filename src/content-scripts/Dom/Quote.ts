import { Option } from '../../types';
import { Author } from './Author';
import { consts } from './consts';
import { hideElement, showElement } from './utils';

export class Quote {
	element: HTMLQuoteElement;
	author: Author;
	constructor(element: HTMLQuoteElement) {
		this.element = element;
		this.author = new Author(this.element.querySelector('.profile-link > a'));

		// console.log({ discr: this.discriminated_username, indiscr: this.indiscriminated_username });
	}

	get discriminated_username(): string | null {
		return this.author.name.discriminated;
	}

	get indiscriminated_username(): string | null {
		return this.author.name.indiscriminated;
	}

	hideChildren(): void {
		const { content, header, quotationMarks } = this;
		if (content) hideElement(content);
		if (header) hideElement(header);
		if (quotationMarks) hideElement(quotationMarks);

		this.element.classList.add(consts.class.hiddenQuote);
	}

	showChildren(): void {
		const { content, header, quotationMarks } = this;
		if (content) showElement(content);
		if (header) showElement(header);
		if (quotationMarks) showElement(quotationMarks);

		this.element.classList.remove(consts.class.hiddenQuote);
	}

	get quotationMarks(): Option<HTMLElement> {
		return this.element.querySelector('span.quote');
	}
	get header(): Option<HTMLElement> {
		return this.element.querySelector('.top');
	}
	get content(): Option<HTMLElement> {
		return this.element.querySelector('.bot');
	}

	static quoteElements(): HTMLQuoteElement[] {
		return Array.from(document.querySelectorAll('blockquote'));
	}

	static quotes(quoteElements = Quote.quoteElements()): Quote[] {
		return quoteElements.map(element => new Quote(element));
	}
}
