import { html, nothing, render } from 'lit';
import { $ } from '../$';
import { SearchData, PostStyle, Tooltip, Option, SupportedLang } from '../../types';
import { getElementDirectText, hideElement, revealElement } from './mod';
import '../../elements/blocked-content/blocked-content';

const HIDDEN_QUOTE_STYLES = Object.freeze({
	padding: '0',
	'border-color': 'rgba(52, 54, 48, 0.3)',
	'background-color': 'inherit',
	'box-shadow': 'none',
});

const build = (
	quotes: HTMLElement[],
	{ users, keywords }: SearchData,
	postStyle: PostStyle,
	lang: SupportedLang,
	withIcons: boolean
): void => {
	for (const quote of quotes) {
		const content = $.quote.content(quote);
		if (!content) continue;

		const userTooltip = byUsers(quote, users);
		const keywordTooltip = byKeywords(quote, keywords);

		if (!userTooltip && !keywordTooltip) continue;

		hideElement(content);
		const header = $.quote.header(quote);
		const quotationMarks = $.quote.quotationMarks(quote);
		if (header) hideElement(header);
		if (quotationMarks) hideElement(quotationMarks);

		const { recoverPreviousStyles } = setStyles(quote, HIDDEN_QUOTE_STYLES);

		const br = quote.nextElementSibling;
		const brExists = br?.tagName === 'BR';
		if (brExists) br.remove();

		render(
			html`<blocked-content
				lang="${lang}"
				post-style="${postStyle}"
				kind="quote"
				?with-icons=${withIcons}
				user-tooltip="${userTooltip ?? nothing}"
				keyword-tooltip="${keywordTooltip ?? nothing}"
				@button-clicked=${() => {
					recoverPreviousStyles();
					revealElement(content);
					if (header) revealElement(header);
					if (quotationMarks) revealElement(quotationMarks);
					if (brExists) quote.after(br);
				}}
			></blocked-content>`,
			quote
		);
	}
};

const byUsers = (quote: HTMLElement, users: SearchData['users']): Option<Tooltip> => {
	const username = $.quote.username(quote);
	if (!username || !users.includes(username)) return null;

	return username;
};

const byKeywords = (quote: HTMLElement, keywords: SearchData['keywords']): Option<Tooltip> => {
	const content = $.quote.content(quote);
	if (!content) return null;

	const text = getElementDirectText(content);

	const foundKeywords = keywords.filter(word => text.includes(word));
	if (!foundKeywords.length) return null;
	return foundKeywords.join(', ');
};

const setCss = (el: HTMLElement, styles: Record<string, string>): void => {
	Object.entries(styles).forEach(([key, value]) => el.style.setProperty(key, value));
};

const setStyles = (el: HTMLElement, styles: Record<string, string>) => {
	const computed = window.getComputedStyle(el);
	const previousStyles: Record<string, string> = {};

	for (const key of Object.keys(styles)) {
		previousStyles[key] = computed.getPropertyValue(key);
	}

	setCss(el, styles);

	return {
		recoverPreviousStyles: (): void => setCss(el, previousStyles),
	};
};

export const Quotes = {
	build,
};
