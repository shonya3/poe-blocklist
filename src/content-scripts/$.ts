import { Option } from '../types';

const post = {
	buttons(post: Element): Option<HTMLElement> {
		return post.querySelector('div.buttons');
	},
	username(post: Element): Option<string> {
		return post.querySelector('span.profile-link.post_by_account > a')?.textContent ?? null;
	},

	contentCell(post: Element): Option<HTMLElement> {
		return post.querySelector('.content-container');
	},

	profileCell(post: Element): Option<HTMLElement> {
		return post.querySelector('.post_info');
	},

	content(post: Element): Option<HTMLElement> {
		return post.querySelector('.content');
	},

	children(post: Element): HTMLTableCellElement[] {
		return Array.from(post.querySelectorAll('td'));
	},
};

const quote = {
	quotationMarks(quote: Element): Option<HTMLElement> {
		return quote.querySelector('span.quote');
	},
	header(quote: Element): Option<HTMLElement> {
		return quote.querySelector('.top');
	},
	content(quote: Element): Option<HTMLElement> {
		return quote.querySelector('.bot');
	},

	username(quote: Element): Option<string> {
		return quote.querySelector('.profile-link > a')?.textContent ?? null;
	},
};

const PREFIX = 'blocklist-ext-';

const cssClass = Object.freeze({
	hiddenQuote: `${PREFIX}hidden-quote`,
	userIcon: `${PREFIX}user-icon`,
	hidden: `${PREFIX}hidden`,
});

export const $ = {
	get posts(): HTMLElement[] {
		return Array.from(document.querySelectorAll('tr:has(.content)'));
	},

	get quotes(): HTMLQuoteElement[] {
		return Array.from(document.querySelectorAll('blockquote'));
	},

	usernames(): string[] {
		const posts = $.posts;
		const usernames = posts.map(postEl => post.username(postEl)).filter(name => Boolean(name)) as string[];
		return usernames;
	},

	uniqueUsernames(): string[] {
		return Array.from(new Set($.usernames()));
	},

	post,
	quote,
	cssClass,
};
