import { Option } from '../../types';
import { consts } from './consts';
import { Thread } from './Thread';
import { Forum } from './Forum';
import { Post } from './Post';

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
	quotes(): HTMLQuoteElement[] {
		return Array.from(document.querySelectorAll('blockquote'));
	},

	quote,
	consts,
	Thread,
	Forum,
	Post,
};
