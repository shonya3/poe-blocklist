import { html, nothing, render } from 'lit';
import { SearchData, PostStyle, Tooltip, Option, SupportedLang } from '../../types';
import { getElementDirectText } from './mod';
import { BlockedContent } from '../../elements/blocked-content/blocked-content';
import { Quote } from '../dom/mod';

export const hideQuotes = (
	quotes: Quote[],
	{ users, keywords }: SearchData,
	postStyle: PostStyle,
	lang: SupportedLang,
	withIcons: boolean
): void => {
	BlockedContent.define();
	for (const quote of quotes) {
		const userTooltip = byUsers(quote, users);
		const keywordTooltip = byKeywords(quote, keywords);

		if (!userTooltip && !keywordTooltip) continue;

		quote.hideChildren();
		removeFollowingLineBreaks(quote.element);

		render(
			html`<blocked-content
				lang="${lang}"
				post-style="${postStyle}"
				kind="quote"
				?with-icons=${withIcons}
				user-tooltip="${userTooltip ?? nothing}"
				keyword-tooltip="${keywordTooltip ?? nothing}"
				@button-clicked=${() => {
					quote.showChildren();
				}}
			></blocked-content>`,
			quote.element
		);
	}
};

const removeFollowingLineBreaks = (element: HTMLElement): void => {
	while (true) {
		const node = element.nextSibling;
		if (node instanceof HTMLBRElement) {
			node.remove();
		} else break;
	}
};

const byUsers = (quote: Quote, users: SearchData['users']): Option<Tooltip> => {
	const { username } = quote;
	if (!username || !users.includes(username)) return null;

	return username;
};

const byKeywords = (quote: Quote, keywords: SearchData['keywords']): Option<Tooltip> => {
	const { content } = quote;
	if (!content) return null;

	const text = getElementDirectText(content);

	const foundKeywords = keywords.filter(word => text.includes(word));
	if (!foundKeywords.length) return null;
	return foundKeywords.join(', ');
};
