import { $ } from '../$';
import { Storage } from '../../Storage';
export { IconUnblockUser } from '../components/icons/icon-unblock-user';
export { IconBlockedUser } from '../components/icons/icon-blocked-user';

const ICON_CLASS = 'blocklist-ext-user-icon';

const iconBlocked = String.raw`
    <icon-blocked-user
        title="Hide messages from this user"
        width="30"
        height="30"
        class="${ICON_CLASS}">
    </icon-blocked-user>`;
const iconUnblock = String.raw`
    <icon-unblock-user
        title="Hide messages from this user"
        width="30"
        height="30"
        class="${ICON_CLASS}">
    </icon-unblock-user>`;

const unblockUserIconHtml = `<icon-unblock-user width="30" height="30" class="${ICON_CLASS}"></icon-unblock-user>`;

const addBlockUserIcon = async (post: Element) => {
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
	addBlockUserIcon: () => $.posts.forEach(post => addBlockUserIcon(post)),
};

export const Update = {
	posts,
};
