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
			const { discriminated_username, buttons } = post;
			if (!buttons || !discriminated_username) continue;

			const isUserBlocked = users.includes(discriminated_username);
			const t = translate(lang);

			let icon: HTMLElement;
			if (isUserBlocked) {
				icon = document.createElement('icon-unblock-user');
				icon.setAttribute('title', t('unblockUser'));
				icon.addEventListener('click', () => Storage.unblockUser(discriminated_username));
			} else {
				icon = document.createElement('icon-blocked-user');
				icon.setAttribute('title', t('hideMessages'));
				icon.addEventListener('click', () => Storage.blockUser(discriminated_username));
			}

			icon.addEventListener('click', () => location.reload());
			icon.classList.add(consts.class.userIcon);
			buttons.append(icon);
		}
	}

	highlight_funny_discriminators(): void {
		Post.posts().forEach(post => {
			console.log(post.author.name.discriminant);
		});
		for (const post of Post.posts()) {
			if (
				['1337', '6969', '0420', '1488', '4200', '0069'].some(d => post.author.name.discriminant?.includes(d))
			) {
				const anchor_el = post.author.name_anchor_element;
				if (!anchor_el) return;

				if (!post.element.querySelector('span.discriminator')) {
					anchor_el.insertAdjacentHTML(
						'afterend',
						`<span style="color: gold;" class="discriminator">${post.author.name.discriminant}</span>`
					);
				}
			}
		}
	}
}
