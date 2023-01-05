import { $ } from '../../$';
import { BanCategory, SearchData, Tooltipper, PostStyle, TooltipMap, Tooltip } from '../../../types';
import { BlockedContent } from '../../components/blocked-content/blocked-content';
import { getElementDirectText, hideElement, revealElement } from '../mod';
import { ELEMENT_ID_ATTR } from './mod';

const buildPosts = (posts: HTMLElement[], tooltipMap: TooltipMap, postStyle: PostStyle) => {
	for (const post of posts) {
		const id = post.getAttribute(ELEMENT_ID_ATTR);
		if (!id) continue;

		const tooltipsByCategory = tooltipMap.get(id);
		const userTooltip = tooltipsByCategory?.users;
		const keywordTooltip = tooltipsByCategory?.keywords;

		if (!userTooltip && !keywordTooltip) continue;

		$.post.children(post).forEach(td => hideElement(td));

		const blockedContent = new BlockedContent({ postStyle, kind: 'post', userTooltip, keywordTooltip });
		blockedContent.addEventListener('button-clicked', () => {
			$.post.children(post).forEach(td => revealElement(td));
		});

		post.append(blockedContent);
	}
};

const tPostByUsers = (post: HTMLElement, users: SearchData['users']): Tooltip => {
	const postedBy = $.post.username(post);
	if (!postedBy || !users.includes(postedBy)) return '';

	return postedBy;
};

const tPostByKeywords = (post: HTMLElement, keywords: SearchData['keywords']): Tooltip => {
	const contentElement = $.post.content(post);
	if (!contentElement) return '';

	const text = getElementDirectText(contentElement);
	return keywords.filter(word => text.toLowerCase().includes(word.toLowerCase())).join(', ');
};

const tooltippers = {
	users: tPostByUsers,
	keywords: tPostByKeywords,
} satisfies Record<BanCategory, Tooltipper>;

export const Posts = {
	tooltippers,
	buildPosts,
};
