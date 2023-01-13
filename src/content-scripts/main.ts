import './index.css';
import { Hide } from './hide/mod';
import { Storage } from '../Storage';
import { Update } from './update/mod';
import { getBrowserLang } from './lib';

async function main(): Promise<void> {
	try {
		const [users, keywords, postStyle, lang] = await Promise.all([
			Storage.getOrDefault('users', []),
			Storage.getOrDefault('keywords', []),
			Storage.getOrDefault('postStyle', 'normal'),
			Storage.getOrDefault('lang', getBrowserLang()),
		]);

		Update.posts.addBlockUserIcon();
		Hide.by({ keywords, users }, postStyle, lang);
	} catch (err) {
		console.log(err);
	}
}

main();
