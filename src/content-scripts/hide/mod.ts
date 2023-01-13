import { by } from './by/mod';

export const getElementDirectText = (el: HTMLElement): string => {
	return Array.from(el.childNodes)
		.filter(el => el.nodeType === el.TEXT_NODE)
		.map(el => el.textContent)
		.join(' ');
};

export const hideElement = (element: HTMLElement): void => element.classList.add('blocklist-ext-hidden');
export const revealElement = (element: HTMLElement): void => element.classList.remove('blocklist-ext-hidden');

export const Hide = {
	by,
};
