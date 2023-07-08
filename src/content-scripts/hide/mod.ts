import { PostStyle, SearchData, SupportedLang } from '../../types';
import { hidePosts } from './hidePosts';
import { hideQuotes } from './hideQuotes';
import { Post, Quote, Thread } from '../dom/mod';

export const getElementDirectText = (el: HTMLElement): string => {
	return Array.from(el.childNodes)
		.filter(el => el.nodeType === el.TEXT_NODE)
		.map(el => el.textContent)
		.join(' ');
};

export class Hide {
	static postsAndQuotes(searchData: SearchData, postStyle: PostStyle, lang: SupportedLang, withIcons: boolean): void {
		hidePosts(Post.posts(), searchData, postStyle, lang, withIcons);
		hideQuotes(Quote.quotes(), searchData, postStyle, lang, withIcons);
	}

	static threads(users: SearchData['users'] = []) {
		if (!Thread.isThreadsView()) return;
		for (const thread of Thread.threads()) {
			const { name } = thread.createdBy;

			if (users.includes(name) || thread.createdBy.blocked) {
				thread.hide();
			}
		}
	}
}
