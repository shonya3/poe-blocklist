import './index.css';
import { Hide } from './hide/mod';
import { Storage } from '../Storage';
import { Update } from './update/mod';
import { Default } from '../Default';
import { Character } from './character/mod';
import { $ } from './$';

export const getCharacterInfo = async (accountName: string, character: string) => {
	const { origin } = window.location;
	const href = `${origin}/character-window/get-characters`;
	const url = new URL(href);

	url.searchParams.append('accountName', accountName);
	url.searchParams.append('character', character);

	const response = await fetch(url);
	const data = await response.json();
	return data;
};

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

		const uniqueVisibleNames = $.uniqueUsernames($.visiblePosts());

		console.time('api-call-for-active-characters');
		const activeCharacters = await Character.info(uniqueVisibleNames);
		console.timeEnd('api-call-for-active-characters');
		console.log(activeCharacters);
	} catch (err) {
		console.log(err);
	}
}

main();
