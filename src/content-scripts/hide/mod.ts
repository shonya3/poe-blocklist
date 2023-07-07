import { $ } from '../dom/mod';
import { PostStyle, SearchData, SupportedLang } from '../../types';
import { hidePosts } from './hidePosts';
import { hideQuotes } from './hideQuotes';

export const threads = (users: SearchData['users'] = []): void => {
	if (!$.Thread.isThreadsView()) return;
	for (const thread of $.Thread.threads()) {
		const { name } = thread.createdBy;

		if (users.includes(name) || thread.createdBy.blocked) {
			hideElement(thread.element);
		}
	}
};

const postsAndQuotes = (
	searchData: SearchData,
	postStyle: PostStyle,
	lang: SupportedLang,
	withIcons: boolean
): void => {
	hidePosts($.Post.posts(), searchData, postStyle, lang, withIcons);
	hideQuotes($.Quote.quotes(), searchData, postStyle, lang, withIcons);
};

export const getElementDirectText = (el: HTMLElement): string => {
	return Array.from(el.childNodes)
		.filter(el => el.nodeType === el.TEXT_NODE)
		.map(el => el.textContent)
		.join(' ');
};

export const hideElement = (element: HTMLElement): void => element.classList.add($.consts.class.hidden);
export const revealElement = (element: HTMLElement): void => element.classList.remove($.consts.class.hidden);
export const removeFollowingLineBreaks = (element: HTMLElement): void => {
	while (true) {
		const node = element.nextSibling;
		if (node instanceof HTMLBRElement) {
			node.remove();
		} else break;
	}
};

export const Hide = {
	postsAndQuotes,
	threads,
};
