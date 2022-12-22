import { $ } from '../../$';
import { BanCategory, SearchData, Tooltipper, PostStyle, TooltipMap } from '../../../types';
import { Posts } from './Posts';
import { Quotes } from './Quotes';

export const ELEMENT_ID_ATTR = 'data-blocklist-id';

export const by = (searchData: SearchData, postStyle: PostStyle): void => {
	const { posts, quotes } = $;

	addIdAttrToElements(...posts, ...quotes);

	const postsTooltips = createTooltips(posts, Posts.tooltippers, searchData);
	const quotesTooltips = createTooltips(quotes, Quotes.tooltippers, searchData);

	Posts.buildPosts(posts, postsTooltips, postStyle);
	Quotes.buildQuotes(quotes, quotesTooltips, postStyle);
};

const createTooltips = (
	elements: HTMLElement[],
	tooltippers: Partial<Record<BanCategory, Tooltipper>>,
	searchData: SearchData
): TooltipMap => {
	const tooltips: TooltipMap = new Map();
	for (const element of elements) {
		const id = element.getAttribute(ELEMENT_ID_ATTR);
		if (!id) continue;
		const elementTooltips: Partial<Record<BanCategory, string>> = {};
		tooltips.set(id, elementTooltips);

		for (const [category, tooltipper] of Object.entries(tooltippers) as [BanCategory, Tooltipper][]) {
			elementTooltips[category] = tooltipper(element, searchData[category]);
		}
	}

	return tooltips;
};

const addIdAttrToElements = (...elements: HTMLElement[]): void => {
	elements.forEach(el => el.setAttribute(ELEMENT_ID_ATTR, crypto.randomUUID()));
};
