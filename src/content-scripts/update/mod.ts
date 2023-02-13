import { $ } from '../$';
import { Storage } from '../../Storage';
import { translate } from '../../translate';
import { SupportedLang } from '../../types';

import '../../elements/icons/icon-blocked-user';
import '../../elements/icons/icon-unblock-user';

const addBlockUserIcon = async (post: Element, lang: SupportedLang) => {
	const buttons = $.post.buttons(post);
	const username = $.post.username(post);
	if (!buttons || !username) return;

	const users = await Storage.getOrDefault('users', []);
	const isUserBlocked = users.includes(username);
	const t = translate(lang);

	let icon: HTMLElement;
	if (isUserBlocked) {
		icon = document.createElement('icon-unblock-user');
		icon.setAttribute('title', t('unblockUser'));
		icon.addEventListener('click', () => Storage.removeUser(username));
	} else {
		icon = document.createElement('icon-blocked-user');
		icon.setAttribute('title', t('hideMessages'));
		icon.addEventListener('click', () => Storage.addUser(username));
	}

	icon.addEventListener('click', () => location.reload());
	icon.classList.add($.cssClass.userIcon);
	buttons.append(icon);
};

const posts = {
	addBlockUserIcon: (lang: SupportedLang) => $.posts.forEach(post => addBlockUserIcon(post, lang)),
};

export const Update = {
	posts,
};
