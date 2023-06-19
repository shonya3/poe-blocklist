import './index.css';
import { Hide } from './hide/mod';
import { Storage } from '../Storage';
import { Update } from './update/mod';
import { Default } from '../Default';

async function main(): Promise<void> {
	try {
		const [users, keywords, postStyle, lang, withIcons, shouldHideThreads] = await Promise.all([
			Storage.getOrDefault('users', []),
			Storage.getOrDefault('keywords', []),
			Storage.getOrDefault('postStyle', Default.postStyle),
			Storage.getOrDefault('lang', Default.lang()),
			Storage.getOrDefault('withIcons', Default.withIcons),
			Storage.getOrDefault('hideThreadsCreatedByBlockedUsers', Default.hideThreadsCreatedByBlockedUsers),
		]);

		Update.posts.addBlockButton(lang);
		Update.threads.editNames(users);
		Update.page.addSettingsButton();

		Hide.postsAndQuotes({ keywords, users }, postStyle, lang, withIcons);
		if (shouldHideThreads) Hide.threads(users);
	} catch (err) {
		console.log(err);
	}
}

main();
