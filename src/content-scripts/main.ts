import './index.css';
import { Hide } from './hide/mod';
import { Storage } from '../Storage';
import { Update } from './update/mod';
import { Default } from '../Default';
import { get_user_name, Name } from './name';

const onSettingsPopoverClose = () => Storage.set('showSettingsPopover', false);
const onHideRuthlessChanged = (hide: boolean) => Storage.set('hideRuthless', hide);
const onHideBugfixesChanged = (hide: boolean) => Storage.set('hideBugfixes', hide);
const onHidePagePostsChanged = (hide: boolean) => Storage.set('hidePagePosts', hide);

async function main(): Promise<void> {
	try {
		const {
			users = [],
			keywords = [],
			postStyle = Default.postStyle,
			lang = Default.lang(),
			withIcons = Default.withIcons,
			hideThreadsCreatedByBlockedUsers = Default.hideThreadsCreatedByBlockedUsers,
			showSettingsPopover = true,
			hideRuthless = false,
			hideBugfixes = false,
			hidePagePosts = false,
			hide_by_indiscriminated_username_aswell = Default.hideThreadsCreatedByBlockedUsers,
		} = await Storage.get();

		Update.page.addSettingsButton(lang, showSettingsPopover, onSettingsPopoverClose);
		Update.page.remove_discriminator_from_logged_in();

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
		if (hideThreadsCreatedByBlockedUsers) Hide.threads({ users, hide_by_indiscriminated_username_aswell });

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
