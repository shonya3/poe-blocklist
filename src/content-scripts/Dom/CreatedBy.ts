import { SupportedLang } from '../../types';
import { translate } from '../../translate';
import { consts } from './consts';
import { get_user_name, Name } from '../name';

export class CreatedBy {
	thread: HTMLTableRowElement;
	name: Name;
	constructor(thread: HTMLTableRowElement) {
		this.thread = thread;
		this.name = new Name({
			value: get_user_name(this.element),
			onChange: ({ indiscriminated }) => {
				if (!indiscriminated) {
					return;
				}

				const el = this.element;
				if (!el) {
					return;
				}

				el.textContent = indiscriminated;
			},
		});
	}

	get blocked(): boolean {
		return this.thread.hasAttribute(consts.attr.CREATOR_BLOCKED);
	}
	set blocked(value: boolean) {
		value
			? this.thread.setAttribute(consts.attr.CREATOR_BLOCKED, '')
			: this.thread.removeAttribute(consts.attr.CREATOR_BLOCKED);
	}

	get element(): HTMLAnchorElement {
		return this.thread.querySelector('.postBy a') as HTMLAnchorElement;
	}

	block(lang: SupportedLang): void {
		this.blockName(lang);
		this.hideChallenges();
		this.blocked = true;
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
