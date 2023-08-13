import './index.css';
import { Hide } from './hide/mod';
import { Storage } from '../Storage';
import { Update } from './update/mod';
import { Default } from '../Default';

const onSettingsPopoverClose = () => Storage.set('showSettingsPopover', false);
const onHideRuthlessChanged = (hide: boolean) => Storage.set('hideRuthless', hide);
const onHideBugfixesChanged = (hide: boolean) => Storage.set('hideBugfixes', hide);
const onHidePagePostsChanged = (hide: boolean) => Storage.set('hidePagePosts', hide);

async function main(): Promise<void> {
	try {
		const [
			users,
			keywords,
			postStyle,
			lang,
			withIcons,
			shouldHideThreads,
			showSettingsPopover,
			hideRuthless,
			hideBugfixes,
			hidePagePosts,
		] = await Promise.all([
			Storage.getOrDefault('users', []),
			Storage.getOrDefault('keywords', []),
			Storage.getOrDefault('postStyle', Default.postStyle),
			Storage.getOrDefault('lang', Default.lang()),
			Storage.getOrDefault('withIcons', Default.withIcons),
			Storage.getOrDefault('hideThreadsCreatedByBlockedUsers', Default.hideThreadsCreatedByBlockedUsers),
			Storage.getOrDefault('showSettingsPopover', true),
			Storage.getOrDefault('hideRuthless', false),
			Storage.getOrDefault('hideBugfixes', false),
			Storage.getOrDefault('hidePagePosts', false),
		]);

		Update.page.addSettingsButton(lang, showSettingsPopover, onSettingsPopoverClose);
		Update.posts.addBlockButton(users, lang);
		Update.threads.editNames(users, lang);
		Update.forums.editNames(users, lang);

		Hide.postsAndQuotes({ keywords, users }, postStyle, lang, withIcons);
		if (shouldHideThreads) Hide.threads(users);

		Hide.ruthless(hideRuthless, onHideRuthlessChanged);
		Hide.bugfixes(hideBugfixes, onHideBugfixesChanged);
		Hide.pagePosts(hidePagePosts, onHidePagePostsChanged);
	} catch (err) {
		console.log(err);
	}
}

main();
