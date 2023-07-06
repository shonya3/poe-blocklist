import './index.css';
import { Hide } from './hide/mod';
import { Storage } from '../Storage';
import { Update } from './update/mod';
import { Default } from '../Default';

const onSettingsPopoverClose = () => Storage.set('showSettingsPopover', false);

async function main(): Promise<void> {
	try {
		const [users, keywords, postStyle, lang, withIcons, shouldHideThreads, showSettingsPopover] = await Promise.all(
			[
				Storage.getOrDefault('users', []),
				Storage.getOrDefault('keywords', []),
				Storage.getOrDefault('postStyle', Default.postStyle),
				Storage.getOrDefault('lang', Default.lang()),
				Storage.getOrDefault('withIcons', Default.withIcons),
				Storage.getOrDefault('hideThreadsCreatedByBlockedUsers', Default.hideThreadsCreatedByBlockedUsers),
				Storage.getOrDefault('showSettingsPopover', true),
			]
		);

		Update.page.addSettingsButton(lang, showSettingsPopover, onSettingsPopoverClose);
		Update.posts.addBlockButton(lang);
		Update.threads.editNames(users, lang);
		Update.forums.editNames(users, lang);

		Hide.postsAndQuotes({ keywords, users }, postStyle, lang, withIcons);
		if (shouldHideThreads) Hide.threads(users);
	} catch (err) {
		console.log(err);
	}
}

main();
