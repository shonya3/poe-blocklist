import { $ } from '../$';
import { Storage } from '../../Storage';
import { translate } from '../../translate';
import { SupportedLang } from '../../types';

import '../components/icons/icon-blocked-user';
import '../components/icons/icon-unblock-user';

const ICON_CLASS = 'blocklist-ext-user-icon';

const addBlockUserIcon = async (post: Element, lang: SupportedLang) => {
	const t = translate(lang);
	const iconBlocked = String.raw`
    <icon-blocked-user
        title="${t('hideMessages')}"
        class="${ICON_CLASS}">
    </icon-blocked-user>`;
	const iconUnblock = String.raw`
    <icon-unblock-user
        title="${t('unblockUser')}"
        class="${ICON_CLASS}">
    </icon-unblock-user>`;

	const buttons = $.post.buttons(post);
	const username = $.post.username(post);
	if (!buttons || !username) return;

	const users = await Storage.getOrDefault('users', []);
	const isUserBlocked = users.includes(username);

	const svgHtml = isUserBlocked ? iconUnblock : iconBlocked;
	buttons.insertAdjacentHTML('beforeend', svgHtml);

	const blockedUserIcon = buttons.querySelector(`.${ICON_CLASS}`) as SVGElement;
	blockedUserIcon.addEventListener('click', async () => {
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
