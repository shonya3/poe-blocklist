export { IconBlockedUser } from './components/icons/icon-blocked-user';
import './index.css';
import { Hide } from './hide/mod';
import { Storage } from '../Storage';
import { Update } from './update/mod';

async function main(): Promise<void> {
	try {
		const [users, keywords, postStyle] = await Promise.all([
			Storage.getOrDefault('users', []),
			Storage.getOrDefault('keywords', []),
			Storage.getOrDefault('postStyle', 'normal'),
		]);

		Update.posts.addBlockUserIcon();
		Hide.by({ keywords, users }, postStyle);
	} catch (err) {
		console.log(err);
	}
}

main();
