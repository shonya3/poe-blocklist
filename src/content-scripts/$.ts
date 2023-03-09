import { Option } from '../types';

const EXTENSION_PREFIX = 'blocklist-ext';

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

	isPostHidden(post: Element) {
		return Boolean(post.querySelector(':has(blocked-content)'));
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

const cssClass = Object.freeze({
	hiddenQuote: `${EXTENSION_PREFIX}-hidden-quote`,
	userIcon: `${EXTENSION_PREFIX}-user-icon`,
	hidden: `${EXTENSION_PREFIX}-hidden`,
});

export const $ = {
	posts(): HTMLElement[] {
		return Array.from(document.querySelectorAll('tr:has(.content)'));
	},

	quotes(): HTMLQuoteElement[] {
		return Array.from(document.querySelectorAll('blockquote'));
	},

	notHiddenPosts(): HTMLElement[] {
		return $.posts().filter(post => !$.post.isPostHidden(post));
	},

	usernames(posts: HTMLElement[]): string[] {
		const usernames = posts.map(postEl => post.username(postEl)).filter(name => Boolean(name)) as string[];
		return usernames;
	},

	uniqueUsernames(posts: HTMLElement[]): string[] {
		return Array.from(new Set($.usernames(posts)));
	},

	post,
	quote,
	cssClass,
};
