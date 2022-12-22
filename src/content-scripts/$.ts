const post = {
	buttons(post: Element): HTMLElement | null {
		return post.querySelector('div.buttons');
	},
	username(post: Element): string | null | undefined {
		return post.querySelector('span.profile-link.post_by_account > a')?.textContent;
	},

	contentCell(post: Element): HTMLElement | null {
		return post.querySelector('.content-container');
	},

	profileCell(post: Element): HTMLElement | null {
		return post.querySelector('.post_info');
	},

	content(post: Element): HTMLElement | null {
		return post.querySelector('.content');
	},

	children(post: Element): HTMLTableCellElement[] {
		return Array.from(post.querySelectorAll('td'));
	},
};

const quote = {
	quotationMarks(quote: Element): HTMLElement | null {
		return quote.querySelector('span.quote');
	},
	header(quote: Element): HTMLElement | null {
		return quote.querySelector('.top');
	},
	content(quote: Element): HTMLElement | null {
		return quote.querySelector('.bot');
	},

	username(quote: Element): string | null | undefined {
		return quote.querySelector('.profile-link > a')?.textContent;
	},
};

export const $ = {
	get posts(): HTMLElement[] {
		return Array.from(document.querySelectorAll('tr:has(.content)'));
	},

	get quotes(): HTMLQuoteElement[] {
		return Array.from(document.querySelectorAll('blockquote'));
	},

	post,
	quote,
};
