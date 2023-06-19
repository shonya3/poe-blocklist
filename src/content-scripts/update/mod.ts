import { $ } from '../$';
import { Storage } from '../../Storage';
import { translate } from '../../translate';
import { Message, SearchData, SupportedLang } from '../../types';

import '../../elements/icons/icon-blocked-user';
import '../../elements/icons/icon-unblock-user';
import { IconSettings } from '../../elements/icons/icon-settings';

const posts = {
	async addBlockButton(lang: SupportedLang) {
		for (const post of $.posts()) {
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
				icon.addEventListener('click', () => Storage.unblockUser(username));
			} else {
				icon = document.createElement('icon-blocked-user');
				icon.setAttribute('title', t('hideMessages'));
				icon.addEventListener('click', () => Storage.blockUser(username));
			}

			icon.addEventListener('click', () => location.reload());
			icon.classList.add($.cssClass.userIcon);
			buttons.append(icon);
		}
	},
};

const threads = {
	editNames(users: SearchData['users']) {
		if (!$.thread.isThreadsView()) return;
		for (const thread of $.threads()) {
			const createdByEl = $.thread.elementCreatedBy(thread);
			const createdBy = $.thread.createdBy(thread);
			if (createdByEl && createdBy && users.includes(createdBy)) {
				createdByEl.textContent = 'blocked';
				createdByEl.href = '';
				createdByEl.classList.add($.cssClass.fontWeight300);
			}

			const lastPostedEl = $.thread.elementLastPosted(thread);
			const lastPosted = $.thread.lastPosted(thread);
			if (lastPostedEl && lastPosted && users.includes(lastPosted)) {
				lastPostedEl.textContent = 'blocked';
				lastPostedEl.href = '';
				lastPostedEl.classList.add($.cssClass.fontWeight300);
			}
		}
	},
};

const page = {
	addSettingsButton() {
		IconSettings.define();
		const iconSettings = document.createElement('icon-settings');
		iconSettings.addEventListener('click', () => {
			chrome.runtime.sendMessage<Message>({ type: 'open-options-page' });
		});
		iconSettings.title = 'Blocklist settings';
		document.querySelector('#statusBar')?.append(iconSettings);
	},
};

export const Update = {
	posts,
	threads,
	page,
};
