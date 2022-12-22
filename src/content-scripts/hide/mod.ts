import { byBlockedUsers } from './byBlockedUsers/mod';
import { byKeywords } from './byKeywords';
import { by } from './by/mod';

export const getElementDirectText = (el: HTMLElement): string => {
	return Array.from(el.childNodes)
		.filter(el => el.nodeType === el.TEXT_NODE)
		.map(el => el.textContent)
		.join(' ');
};

export const hideElement = (element: HTMLElement): void => element.classList.add('ext-hidden');
export const revealElement = (element: HTMLElement): void => element.classList.remove('ext-hidden');

export const Hide = {
	byKeywords,
	byBlockedUsers,
	by,
};
