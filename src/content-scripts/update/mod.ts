import { $ } from '../$';
import { Storage } from '../../Storage';
import { translate } from '../../translate';
import { Message, SearchData, SupportedLang } from '../../types';

import '../../elements/icons/icon-blocked-user';
import '../../elements/icons/icon-unblock-user';
import { IconSettings } from '../../elements/icons/icon-settings';
import { MyPopoverElement } from '../../elements/popover/my-popover';

const posts = {
	async addBlockButton(lang: SupportedLang) {
		for (const post of $.posts()) {
			const buttons = $.post.buttons(post);
			const username = $.post.username(post);
			if (!buttons || !username) continue;

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
			icon.classList.add($.consts.class.userIcon);
			buttons.append(icon);
		}
	},
};

const threads = {
	editNames(users: SearchData['users'], lang: SupportedLang) {
		if (!$.thread.isThreadsView()) return;
		for (const thread of $.threads()) {
			const createdByEl = $.thread.elementCreatedBy(thread);
			const createdBy = $.thread.createdBy(thread);
			if (createdByEl && createdBy && users.includes(createdBy)) {
				$.thread.blockName(createdByEl, lang);
				$.thread.hideChallenges(createdByEl);
				$.thread.setCreatorBlocked(thread);
			}

			const lastPostedEl = $.thread.elementLastPosted(thread);
			const lastPosted = $.thread.lastPosted(thread);
			if (lastPostedEl && lastPosted && users.includes(lastPosted)) {
				$.thread.blockName(lastPostedEl, lang);
				$.thread.hideChallenges(lastPostedEl);
			}
		}
	},
};

const forums = {
	editNames(users: SearchData['users'], lang: SupportedLang) {
		if (!$.forums.isForumsView()) return;
		for (const forum of $.forums.forums()) {
			const lastPostedEl = $.forums.elementLastPosted(forum);
			const lastPosted = $.forums.lastPosted(forum);

			if (lastPostedEl && lastPosted && users.includes(lastPosted)) {
				$.forums.blockName(lastPostedEl, lang);
				$.forums.hideChallenges(lastPostedEl);
			}
		}
	},
};

const page = {
	addSettingsButton(lang: SupportedLang, showSettingsPopover: boolean, onPopoverClose?: () => void): IconSettings {
		IconSettings.define();
		MyPopoverElement.define();
		const t = translate(lang);
		const iconSettings = document.createElement('icon-settings');
		iconSettings.addEventListener('click', () => {
			chrome.runtime.sendMessage<Message>({ type: 'open-options-page' });
		});
		iconSettings.title = t('openBlocklistSettings');
		document.querySelector('#statusBar')?.append(iconSettings);
		if (showSettingsPopover) {
			const popover = document.createElement('my-popover');
			popover.textContent = translate(lang)('hereIsBlocklistSettings');
			popover.addEventListener('click', e => {
				const [target] = e.composedPath();
				if (target instanceof HTMLButtonElement) {
					popover.remove();
					onPopoverClose?.();
				}
			});
			iconSettings.after(popover);
		}

		return iconSettings;
	},
};

export const Update = {
	posts,
	threads,
	page,
	forums,
};
