import { $ } from '../Dom/mod';
import { PostStyle, SearchData, SupportedLang } from '../../types';
import { Posts } from './Posts';
import { Quotes } from './Quotes';

export const threads = (users: SearchData['users'] = []): void => {
	if (!$.Thread.isThreadsView()) return;
	for (const threadElement of $.threads()) {
		const thread = new $.Thread(threadElement);
		const { name } = thread.createdBy;

		if (users.includes(name) || thread.createdBy.blocked) {
			hideElement(threadElement);
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
