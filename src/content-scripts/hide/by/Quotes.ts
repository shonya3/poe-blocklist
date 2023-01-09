import { $ } from '../../$';
import { SearchData, Tooltipper, PostStyle, Tooltip, TooltipMap, BanCategory, Option } from '../../../types';
import { BlockedContent } from '../../components/blocked-content/blocked-content';
import { getElementDirectText, hideElement, revealElement } from '../mod';
import { ELEMENT_ID_ATTR } from './mod';

const buildQuotes = (quotes: HTMLElement[], tooltipMap: TooltipMap, postStyle: PostStyle): void => {
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

		const blockedContent = new BlockedContent({ postStyle, kind: 'quote', userTooltip, keywordTooltip });
		blockedContent.addEventListener('button-clicked', () => {
			revealElement(content);
			if (header) revealElement(header);
			if (quotationMarks) revealElement(quotationMarks);
		});

		quote.append(blockedContent);
	}
};

const tQuoteByUsers = (quote: HTMLElement, users: SearchData['users']): Option<Tooltip> => {
	const username = $.quote.username(quote);
	if (!username || !users.includes(username)) return null;

	return username;
};

const tQuotesByKeywords = (quote: HTMLElement, keywords: SearchData['keywords']): Option<Tooltip> => {
	const content = $.quote.content(quote);
	if (!content) return null;

	const text = getElementDirectText(content);

	return keywords.filter(word => text.includes(word)).join(', ');
};

const tooltippers = {
	users: tQuoteByUsers,
	keywords: tQuotesByKeywords,
} satisfies Record<BanCategory, Tooltipper>;

export const Quotes = {
	buildQuotes,
	tooltippers,
};
