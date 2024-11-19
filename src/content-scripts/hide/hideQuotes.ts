import { html, render } from 'lit';
import { SearchData, PostStyle, Tooltip, Option, SupportedLang } from '../../types';
import { getElementDirectText } from './mod';
import { BlockedContent } from '../../elements/blocked-content/blocked-content';
import { Quote } from '../Dom/mod';

export const hideQuotes = (
	quotes: Quote[],
	{ users, keywords }: SearchData,
	postStyle: PostStyle,
	lang: SupportedLang,
	withIcons: boolean,
	hide_by_indiscriminated_username_aswell: boolean
): void => {
	BlockedContent.define();
	for (const quote of quotes) {
		const userTooltip = byUsers({ quote, users, hide_by_indiscriminated_username_aswell });
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
				.userTooltip=${userTooltip}
				.keywordTooltip=${keywordTooltip}
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

const byUsers = ({
	quote,
	users,
	hide_by_indiscriminated_username_aswell,
}: {
	quote: Quote;
	users: SearchData['users'];
	hide_by_indiscriminated_username_aswell: boolean;
}): Option<Tooltip> => {
	const discriminated = quote.discriminated_username;
	if (discriminated && users.includes(discriminated)) {
		return discriminated;
	}

	if (!hide_by_indiscriminated_username_aswell) {
		return null;
	}

	const indiscriminated = quote.indiscriminated_username;
	if (indiscriminated && users.includes(indiscriminated)) {
		return indiscriminated;
	}

	return null;
};

const byKeywords = (quote: Quote, keywords: SearchData['keywords']): Option<Tooltip> => {
	const { content } = quote;
	if (!content) return null;

	const text = getElementDirectText(content);

	const foundKeywords = keywords.filter(word => text.includes(word));
	if (!foundKeywords.length) return null;
	return foundKeywords.join(', ');
};
