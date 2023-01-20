import { $ } from '../$';
import { Storage } from '../../Storage';
import { translate } from '../../translate';
import { SupportedLang } from '../../types';

import '../components/icons/icon-blocked-user';
import '../components/icons/icon-unblock-user';

const ICON_CLASS = 'blocklist-ext-user-icon';

const iconBlocked = String.raw`
    <icon-blocked-user
        class="${ICON_CLASS}">
    </icon-blocked-user>`;
const iconUnblock = String.raw`
    <icon-unblock-user
        class="${ICON_CLASS}">
    </icon-unblock-user>`;

const addBlockUserIcon = async (post: Element, lang: SupportedLang) => {
	const t = translate(lang);

	const buttons = $.post.buttons(post);
	const username = $.post.username(post);
	if (!buttons || !username) return;

	const users = await Storage.getOrDefault('users', []);
	const isUserBlocked = users.includes(username);

	const svgHtml = isUserBlocked ? iconUnblock : iconBlocked;
	buttons.insertAdjacentHTML('beforeend', svgHtml);

	const icon = buttons.querySelector(`.${ICON_CLASS}`) as SVGElement;
	icon.setAttribute('title', `${isUserBlocked ? t('unblockUser') : t('hideMessages')}`);
	icon.addEventListener('click', async () => {
		isUserBlocked ? await Storage.removeUser(username) : await Storage.addUser(username);
		location.reload();
	});
};

const posts = {
	addBlockUserIcon: (lang: SupportedLang) => $.posts.forEach(post => addBlockUserIcon(post, lang)),
};

export const Update = {
	posts,
};
