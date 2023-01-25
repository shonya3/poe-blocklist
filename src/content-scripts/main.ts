import './index.css';
import { Hide } from './hide/mod';
import { Storage } from '../Storage';
import { Update } from './update/mod';
import { getBrowserLang } from '../lib';

async function main(): Promise<void> {
	try {
		const [users, keywords, postStyle, lang, withIcons] = await Promise.all([
			Storage.getOrDefault('users', []),
			Storage.getOrDefault('keywords', []),
			Storage.getOrDefault('postStyle', 'normal'),
			Storage.getOrDefault('lang', getBrowserLang()),
			Storage.getOrDefault('withIcons', true),
		]);

		Update.posts.addBlockUserIcon(lang);
		Hide.by({ keywords, users }, postStyle, lang, withIcons);
	} catch (err) {
		console.log(err);
	}
}

main();
