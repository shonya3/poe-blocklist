import { IconSettings } from '../../elements/icons/icon-settings';
import { MyPopoverElement } from '../../elements/popover/my-popover';
import { translate } from '../../translate';
import { Message, SupportedLang } from '../../types';
import { get_user_name, Name } from '../_name';

export class UpdatePage {
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
			popover.style.setProperty('z-index', '200');
			popover.textContent = t('hereIsBlocklistSettings');
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
	}

	remove_discriminator_from_logged_in() {
		const page_profile_link = document.querySelector<HTMLAnchorElement>('#statusBar .profile-link a');
		new Name({
			value: get_user_name(page_profile_link),
			onChange: ({ indiscriminated }) => {
				const page_profile_link = document.querySelector<HTMLAnchorElement>('#statusBar .profile-link a');
				if (page_profile_link) {
					page_profile_link.textContent = indiscriminated;
				}
			},
		});
	}
}
