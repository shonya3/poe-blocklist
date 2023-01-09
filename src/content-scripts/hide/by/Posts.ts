import { html, render, nothing } from 'lit-html';
import { $ } from '../../$';
import { BanCategory, SearchData, Tooltipper, PostStyle, TooltipMap, Tooltip, Option } from '../../../types';
import { getElementDirectText, hideElement, revealElement } from '../mod';
import { ELEMENT_ID_ATTR } from './mod';
import '../../components/blocked-content/blocked-content';

const buildPosts = (posts: HTMLElement[], tooltipMap: TooltipMap, postStyle: PostStyle) => {
	for (const post of posts) {
		const id = post.getAttribute(ELEMENT_ID_ATTR);
		if (!id) continue;

		const tooltipsByCategory = tooltipMap.get(id);
		const userTooltip = tooltipsByCategory?.users;
		const keywordTooltip = tooltipsByCategory?.keywords;

		if (!userTooltip && !keywordTooltip) continue;

		$.post.children(post).forEach(td => hideElement(td));

		render(
			html`<blocked-content
				post-style="${postStyle}"
				kind="post"
				user-tooltip="${userTooltip ?? nothing}"
				keyword-tooltip="${keywordTooltip ?? nothing}"
				@button-clicked=${() => {
					$.post.children(post).forEach(td => revealElement(td));
				}}
			></blocked-content>`,
			post
		);
	}
};

const tPostByUsers = (post: HTMLElement, users: SearchData['users']): Option<Tooltip> => {
	const postedBy = $.post.username(post);
	if (!postedBy || !users.includes(postedBy)) return null;

	return postedBy;
};

const tPostByKeywords = (post: HTMLElement, keywords: SearchData['keywords']): Option<Tooltip> => {
	const contentElement = $.post.content(post);
	if (!contentElement) return null;

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
