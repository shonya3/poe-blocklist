import './index.css';
import { Hide } from './hide/mod';
import { Storage } from '../Storage';
import { Update } from './update/mod';
import { Default } from '../Default';

async function main(): Promise<void> {
	try {
		const [users, keywords, postStyle, lang, withIcons] = await Promise.all([
			Storage.getOrDefault('users', []),
			Storage.getOrDefault('keywords', []),
			Storage.getOrDefault('postStyle', Default.postStyle),
			Storage.getOrDefault('lang', Default.lang()),
			Storage.getOrDefault('withIcons', Default.withIcons),
		]);

		Update.posts.addBlockUserIcon(lang);
		Hide.by({ keywords, users }, postStyle, lang, withIcons);
	} catch (err) {
		console.log(err);
	}
}

main();
