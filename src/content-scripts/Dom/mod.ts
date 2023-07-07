import { SupportedLang, Option } from '../../types';
import { translate } from '../../translate';
import { Thread } from './Thread';
import { consts } from './consts';

const forums = {
	isForumsView(): boolean {
		const { pathname } = new URL(window.location.href);
		return pathname === '/forum';
	},

	elementLastPosted(thread: Element): Option<HTMLAnchorElement> {
		return thread.querySelector('.last_post a');
	},

	lastPosted(thread: Element): Option<string> {
		return thread.querySelector('.last_post a')?.textContent ?? null;
	},

	forums() {
		if (!forums.isForumsView()) return [];
		return Array.from(document.querySelectorAll('tr:has(.last_post a)'));
	},

	blockName(el: HTMLAnchorElement, lang: SupportedLang): void {
		el.textContent = translate(lang)('blocked');
		el.href = '';
		el.classList.add($.consts.class.fontWeight300);
	},

	hideChallenges(el: Element): void {
		el.parentElement?.setAttribute($.consts.attr.HIDE_CHALLENGES, '');
	},
};

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

export const $ = {
	posts(): HTMLElement[] {
		return Array.from(document.querySelectorAll('tr:has(.content)'));
	},

	quotes(): HTMLQuoteElement[] {
		return Array.from(document.querySelectorAll('blockquote'));
	},

	threads(): HTMLTableRowElement[] {
		if (!Thread.isThreadsView()) return [];
		return Array.from(document.querySelectorAll('tr:has(.thread)'));
	},

	hiddenPosts(): HTMLElement[] {
		return $.posts().filter(post => $.post.isPostHidden(post));
	},

	visiblePosts(): HTMLElement[] {
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
	forums,
	consts,
	Thread,
};
