import { Storage } from '../../Storage';
import { IconBlockedUser } from '../../elements/icons/icon-blocked-user';
import { IconUnblockUser } from '../../elements/icons/icon-unblock-user';
import { translate } from '../../translate';
import { SearchData, SupportedLang } from '../../types';
import { Post, consts } from '../Dom/mod';

export class UpdatePosts {
	addBlockButton(users: SearchData['users'], lang: SupportedLang): void {
		IconBlockedUser.define();
		IconUnblockUser.define();
		for (const post of Post.posts()) {
			const { username, buttons } = post;
			if (!buttons || !username) continue;

			const isUserBlocked = users.includes(username);
			const t = translate(lang);

			let icon: HTMLElement;
			if (isUserBlocked) {
				icon = document.createElement('icon-unblock-user');
				icon.setAttribute('title', t('unblockUser'));
				icon.addEventListener('click', () => Storage.unblockUser(username));
			} else {
				icon = document.createElement('icon-blocked-user');
				icon.setAttribute('title', t('hideMessages'));
				icon.addEventListener('click', () => Storage.blockUser(username));
			}

			icon.addEventListener('click', () => location.reload());
			icon.classList.add(consts.class.userIcon);
			buttons.append(icon);
		}
	}
}
