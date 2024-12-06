import { translate } from '../../translate';
import { SupportedLang } from '../../types';
import { get_user_name, Name } from '../_name';
import { consts } from './consts';

export class LastPostedBy {
	thread: HTMLTableRowElement;
	name: Name;
	constructor(thread: HTMLTableRowElement) {
		this.thread = thread;

		this.name = new Name({
			value: get_user_name(this.thread.querySelector('.last_post a')),
			onChange: ({ indiscriminated }) => {
				if (!indiscriminated) {
					return;
				}

				const el = this.thread.querySelector('.last_post a');
				if (!el) {
					return;
				}

				el.textContent = indiscriminated;
			},
		});
	}

	get element(): HTMLAnchorElement {
		return this.thread.querySelector('.last_post a') as HTMLAnchorElement;
	}

	block(lang: SupportedLang): void {
		this.blockName(lang);
		this.hideChallenges();
	}

	blockName(lang: SupportedLang): void {
		this.name.change(translate(lang)('blocked'));
		this.element.href = '';
		this.element.classList.add(consts.class.fontWeight300);
	}

	hideChallenges(): void {
		this.element.parentElement?.setAttribute(consts.attr.HIDE_CHALLENGES, '');
	}
}
