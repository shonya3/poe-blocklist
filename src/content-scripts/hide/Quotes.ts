import { html, nothing, render } from 'lit';
import { $ } from '../$';
import { SearchData, PostStyle, Tooltip, Option, SupportedLang } from '../../types';
import { getElementDirectText, hideElement, revealElement } from './mod';
import '../../elements/blocked-content/blocked-content';

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
		const { padding, backgroundColor, border, boxShadow } = window.getComputedStyle(quote);
		quote.style.setProperty('padding', '0');
		quote.style.setProperty('border-color', 'rgba(52, 54, 48, 0.3)');
		quote.style.setProperty('background-color', 'inherit');
		quote.style.setProperty('box-shadow', 'none');

		render(
			html`<blocked-content
				lang="${lang}"
				post-style="${postStyle}"
				kind="quote"
				?with-icons=${withIcons}
				user-tooltip="${userTooltip ?? nothing}"
				keyword-tooltip="${keywordTooltip ?? nothing}"
				@button-clicked=${() => {
					revealElement(content);
					if (header) revealElement(header);
					if (quotationMarks) revealElement(quotationMarks);
					quote.style.setProperty('padding', padding);
					quote.style.setProperty('border', border);
					quote.style.setProperty('background-color', backgroundColor);
					quote.style.setProperty('box-shadow', boxShadow);
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

export const Quotes = {
	build,
};
