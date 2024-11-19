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
			hide_by_indiscriminated_username_aswell,
		] = await Promise.all([
			Storage.getOrDefault('users', []),
			Storage.getOrDefault('keywords', []),
			Storage.getOrDefault('postStyle', Default.postStyle),
			Storage.getOrDefault('lang', Default.lang()),
			Storage.getOrDefault('withIcons', Default.withIcons),
			Storage.getOrDefault('hideThreadsCreatedByBlockedUsers', Default.hideThreadsCreatedByBlockedUsers),
			Storage.getOrDefault('showSettingsPopover', false),
			Storage.getOrDefault('hideRuthless', false),
			Storage.getOrDefault('hideBugfixes', false),
			Storage.getOrDefault('hidePagePosts', false),
			Storage.getOrDefault(
				'hide_by_indiscriminated_username_aswell',
				Default.hide_by_indiscriminated_username_aswell
			),
		]);

		Update.page.addSettingsButton(lang, showSettingsPopover, onSettingsPopoverClose);
		Update.posts.addBlockButton(users, lang);
		Update.threads.editNames({ users, lang, hide_by_indiscriminated_username_aswell });
		Update.forums.editNames({ users, lang, hide_by_indiscriminated_username_aswell });

		Hide.postsAndQuotes({
			searchData: { keywords, users },
			postStyle,
			lang,
			withIcons,
			hide_by_indiscriminated_username_aswell,
		});
		if (shouldHideThreads) Hide.threads(users);

		Hide.ruthless(hideRuthless, onHideRuthlessChanged);
		Hide.bugfixes(hideBugfixes, onHideBugfixesChanged);
		Hide.pagePosts({
			hide: hidePagePosts,
			hide_by_indiscriminated_username_aswell,
			onHideChanged: onHidePagePostsChanged,
		});
	} catch (err) {
		console.log(err);
	}
}

main();
console.log('Poe Blocklist Extension HELLO');
