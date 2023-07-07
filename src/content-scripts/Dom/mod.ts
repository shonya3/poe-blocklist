import { Option } from '../../types';
import { consts } from './consts';
import { Thread } from './Thread';
import { Forum } from './Forum';
import { Post } from './Post';

// const post = {
// 	buttons(post: Element): Option<HTMLElement> {
// 		return post.querySelector('div.buttons');
// 	},
// 	username(post: Element): Option<string> {
// 		return post.querySelector('span.profile-link.post_by_account > a')?.textContent ?? null;
// 	},

// 	contentCell(post: Element): Option<HTMLElement> {
// 		return post.querySelector('.content-container');
// 	},

// 	profileCell(post: Element): Option<HTMLElement> {
// 		return post.querySelector('.post_info');
// 	},

// 	content(post: Element): Option<HTMLElement> {
// 		return post.querySelector('.content');
// 	},

// 	children(post: Element): HTMLTableCellElement[] {
// 		return Array.from(post.querySelectorAll('td'));
// 	},

// 	isPostHidden(post: Element) {
// 		return Boolean(post.querySelector(':has(blocked-content)'));
// 	},
// };

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

export const $ = {
	// posts(): HTMLElement[] {
	// 	return Array.from(document.querySelectorAll('tr:has(.content)'));
	// },

	quotes(): HTMLQuoteElement[] {
		return Array.from(document.querySelectorAll('blockquote'));
	},

	quote,
	consts,
	Thread,
	Forum,
	Post,
};
