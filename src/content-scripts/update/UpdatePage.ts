import { IconSettings } from '../../elements/icons/icon-settings';
import { MyPopoverElement } from '../../elements/popover/my-popover';
import { translate } from '../../translate';
import { Message, SupportedLang } from '../../types';

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
			popover.textContent = translate(lang)('hereIsBlocklistSettings');
			popover.addEventListener('click', e => {
				const [target] = e.composedPath();
				if (target instanceof HTMLButtonElement) {
					popover.remove();
					onPopoverClose?.();
				}
			});
			// iconSettings.after(popover);
		}

		return iconSettings;
	}
}
