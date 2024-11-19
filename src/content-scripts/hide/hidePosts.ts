import { html, render } from 'lit';
import { SearchData, PostStyle, Tooltip, Option, SupportedLang } from '../../types';
import { getElementDirectText } from './mod';
import { BlockedContent } from '../../elements/blocked-content/blocked-content';
import { Post } from '../Dom/mod';

export const hidePosts = (
	posts: Post[],
	{ users, keywords }: SearchData,
	postStyle: PostStyle,
	lang: SupportedLang,
	withIcons: boolean,
	hide_by_indiscriminated_username_aswell: boolean
): void => {
	BlockedContent.define();
	for (const post of posts) {
		const userTooltip = byUsers({ post, users, hide_by_indiscriminated_username_aswell });
		const keywordTooltip = byKeywords(post, keywords);
		if (!userTooltip && !keywordTooltip) continue;

		post.hideChildren();

		render(
			html`<td style="padding: 0" data-blocklist-ext-temp-td>
					<blocked-content
						lang="${lang}"
						post-style="${postStyle}"
						kind="post"
						?with-icons=${withIcons}
						.userTooltip=${userTooltip}
						.keywordTooltip=${keywordTooltip}
						@button-clicked=${() => {
							post.element
								.querySelectorAll('[data-blocklist-ext-temp-td]')
								.forEach(tempTd => tempTd.remove());
							post.showChildren();
						}}
					></blocked-content>
				</td>
				<td style="padding: 0" data-blocklist-ext-temp-td></td>`,
			post.element
		);
	}
};

const byUsers = ({
	post,
	users,
	hide_by_indiscriminated_username_aswell,
}: {
	post: Post;
	users: SearchData['users'];
	hide_by_indiscriminated_username_aswell: boolean;
}): Option<Tooltip> => {
	const discriminated = post.discriminated_username;
	if (discriminated && users.includes(discriminated)) {
		return discriminated;
	}

	if (!hide_by_indiscriminated_username_aswell) {
		return null;
	}

	const indiscriminated = post.indiscriminated_username;
	if (indiscriminated && users.includes(indiscriminated)) {
		return indiscriminated;
	}

	return null;
};

const byKeywords = (post: Post, keywords: SearchData['keywords']): Option<Tooltip> => {
	const contentElement = post.content;
	if (!contentElement) return null;

	const text = getElementDirectText(contentElement);
	return keywords.filter(word => text.toLowerCase().includes(word.toLowerCase())).join(', ');
};
