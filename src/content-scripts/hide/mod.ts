import { PostStyle, SearchData, SupportedLang } from '../../types';
import { hidePosts } from './hidePosts';
import { hideQuotes } from './hideQuotes';
import { Post, Quote, Thread } from '../Dom/mod';
import { hideRuthless } from './hideRuthless/mod';
import { hideBugfixes } from './hideBugfixes/mod';
import { hidePagePosts } from './hidePagePosts/mod';

export const getElementDirectText = (el: HTMLElement): string => {
	return Array.from(el.childNodes)
		.filter(el => el.nodeType === el.TEXT_NODE)
		.map(el => el.textContent)
		.join(' ');
};

export class Hide {
	static postsAndQuotes({
		searchData,
		postStyle,
		lang,
		withIcons,
		hide_by_indiscriminated_username_aswell,
	}: {
		searchData: SearchData;
		postStyle: PostStyle;
		lang: SupportedLang;
		withIcons: boolean;
		hide_by_indiscriminated_username_aswell: boolean;
	}): void {
		hidePosts(Post.posts(), searchData, postStyle, lang, withIcons, hide_by_indiscriminated_username_aswell);
		hideQuotes(Quote.quotes(), searchData, postStyle, lang, withIcons, hide_by_indiscriminated_username_aswell);
	}

	static threads({
		users = [],
		hide_by_indiscriminated_username_aswell,
	}: {
		users?: SearchData['users'];
		hide_by_indiscriminated_username_aswell: boolean;
	}) {
		if (!Thread.isThreadsView()) return;
		for (const thread of Thread.threads()) {
			const { name } = thread.createdBy;

			if ((name.discriminated && users.includes(name.discriminated)) || thread.createdBy.blocked) {
				thread.hide();
			}

			if (
				(hide_by_indiscriminated_username_aswell &&
					name.indiscriminated &&
					users.includes(name.indiscriminated)) ||
				thread.createdBy.blocked
			) {
				thread.hide();
			}
		}
	}

	static ruthless(hide: boolean, onHideChanged: (hide: boolean) => void) {
		return hideRuthless(hide, onHideChanged);
	}

	static bugfixes(hide: boolean, onHideChanged: (hide: boolean) => void) {
		return hideBugfixes(hide, onHideChanged);
	}

	static pagePosts({
		hide,
		onHideChanged,
		hide_by_indiscriminated_username_aswell,
	}: {
		hide: boolean;
		hide_by_indiscriminated_username_aswell: boolean;
		onHideChanged: (hide: boolean) => void;
	}) {
		hidePagePosts(hide, onHideChanged);
	}
}
