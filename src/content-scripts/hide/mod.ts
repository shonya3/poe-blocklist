import { $ } from '../$';
import { PostStyle, SearchData, SupportedLang } from '../../types';
import { Posts } from './Posts';
import { Quotes } from './Quotes';

const by = (searchData: SearchData, postStyle: PostStyle, lang: SupportedLang, withIcons: boolean): void => {
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

export const Hide = {
	by,
};
