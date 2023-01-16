import { html, nothing, render } from 'lit-html';
import { $ } from '../../$';
import {
	SearchData,
	Tooltipper,
	PostStyle,
	Tooltip,
	TooltipMap,
	BanCategory,
	Option,
	SupportedLang,
} from '../../../types';
import { getElementDirectText, hideElement, revealElement } from '../mod';
import { ELEMENT_ID_ATTR } from './mod';
import '../../components/blocked-content/blocked-content';

const buildQuotes = (
	quotes: HTMLElement[],
	tooltipMap: TooltipMap,
	postStyle: PostStyle,
	lang: SupportedLang,
	withIcons: boolean
): void => {
	for (const quote of quotes) {
		const content = $.quote.content(quote);
		const id = quote.getAttribute(ELEMENT_ID_ATTR);
		if (!content || !id) continue;

		const tooltipsByCategory = tooltipMap.get(id);
		const userTooltip = tooltipsByCategory?.users;
		const keywordTooltip = tooltipsByCategory?.keywords;

		if (!userTooltip && !keywordTooltip) continue;

		hideElement(content);
		const header = $.quote.header(quote);
		const quotationMarks = $.quote.quotationMarks(quote);
		if (header) hideElement(header);
		if (quotationMarks) hideElement(quotationMarks);
		const { padding } = window.getComputedStyle(quote);
		quote.style.setProperty('padding', '0');

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
				}}
			></blocked-content>`,
			quote
		);
	}
};

const tQuoteByUsers = (quote: HTMLElement, users: SearchData['users']): Option<Tooltip> => {
	const username = $.quote.username(quote);
	if (!username || !users.includes(username)) return null;

	return username;
};

const tQuoteByKeywords = (quote: HTMLElement, keywords: SearchData['keywords']): Option<Tooltip> => {
	const content = $.quote.content(quote);
	if (!content) return null;

	const text = getElementDirectText(content);

	const foundKeywords = keywords.filter(word => text.includes(word));
	if (!foundKeywords.length) return null;
	return foundKeywords.join(', ');
};

const tooltippers = {
	users: tQuoteByUsers,
	keywords: tQuoteByKeywords,
} satisfies Record<BanCategory, Tooltipper>;

export const Quotes = {
	buildQuotes,
	tooltippers,
};
