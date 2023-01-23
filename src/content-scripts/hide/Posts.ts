import { html, render, nothing } from 'lit';
import { $ } from '../$';
import { SearchData, PostStyle, Tooltip, Option, SupportedLang } from '../../types';
import { getElementDirectText, hideElement, revealElement } from './mod';
import '../components/blocked-content/blocked-content';

const build = (
	posts: HTMLElement[],
	{ users, keywords }: SearchData,
	postStyle: PostStyle,
	lang: SupportedLang,
	withIcons: boolean
) => {
	for (const post of posts) {
		const userTooltip = byUsers(post, users);
		const keywordTooltip = byKeywords(post, keywords);
		if (!userTooltip && !keywordTooltip) continue;

		$.post.children(post).forEach(td => hideElement(td));

		render(
			html`<td style="padding: 0" data-blocklist-ext-temp-td>
					<blocked-content
						lang="${lang}"
						post-style="${postStyle}"
						kind="post"
						?with-icons=${withIcons}
						user-tooltip="${userTooltip ?? nothing}"
						keyword-tooltip="${keywordTooltip ?? nothing}"
						@button-clicked=${() => {
							post.querySelectorAll('[data-blocklist-ext-temp-td]').forEach(tempTd => tempTd.remove());
							$.post.children(post).forEach(td => revealElement(td));
						}}
					></blocked-content>
				</td>
				<td style="padding: 0" data-blocklist-ext-temp-td></td>`,
			post
		);
	}
};

const byUsers = (post: HTMLElement, users: SearchData['users']): Option<Tooltip> => {
	const postedBy = $.post.username(post);
	if (!postedBy || !users.includes(postedBy)) return null;

	return postedBy;
};

const byKeywords = (post: HTMLElement, keywords: SearchData['keywords']): Option<Tooltip> => {
	const contentElement = $.post.content(post);
	if (!contentElement) return null;

	const text = getElementDirectText(contentElement);
	return keywords.filter(word => text.toLowerCase().includes(word.toLowerCase())).join(', ');
};

export const Posts = {
	build,
};
