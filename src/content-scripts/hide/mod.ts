import { $ } from '../$';
import { PostStyle, SearchData, SupportedLang } from '../../types';
import { Posts } from './Posts';
import { Quotes } from './Quotes';

export const threads = (users: SearchData['users'] = []): void => {
	if (!$.thread.isThreadsView()) return;
	for (const thread of $.threads()) {
		const createdBy = $.thread.createdBy(thread);
		if ((createdBy && users.includes(createdBy)) || createdBy === 'blocked') {
			hideElement(thread);
		}
	}
};

const postsAndQuotes = (
	searchData: SearchData,
	postStyle: PostStyle,
	lang: SupportedLang,
	withIcons: boolean
): void => {
	Posts.build($.posts(), searchData, postStyle, lang, withIcons);
	Quotes.build($.quotes(), searchData, postStyle, lang, withIcons);
};

export const getElementDirectText = (el: HTMLElement): string => {
	return Array.from(el.childNodes)
		.filter(el => el.nodeType === el.TEXT_NODE)
		.map(el => el.textContent)
		.join(' ');
};

export const hideElement = (element: HTMLElement): void => element.classList.add($.cssClass.hidden);
export const revealElement = (element: HTMLElement): void => element.classList.remove($.cssClass.hidden);
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
