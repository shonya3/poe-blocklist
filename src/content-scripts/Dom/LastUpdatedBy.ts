import { translate } from '../../translate';
import { SupportedLang } from '../../types';
import { consts } from './consts';

export class LastUpdatedBy {
	thread: HTMLTableRowElement;
	constructor(thread: HTMLTableRowElement) {
		this.thread = thread;
	}

	get element(): HTMLAnchorElement {
		return this.thread.querySelector('.last_post a') as HTMLAnchorElement;
	}

	set name(name: string) {
		this.element.textContent = name;
	}
	get name(): string {
		return this.element.textContent as string;
	}

	block(lang: SupportedLang): void {
		this.blockName(lang);
		this.hideChallenges();
	}

	blockName(lang: SupportedLang): void {
		this.name = translate(lang)('blocked');
		this.element.href = '';
		this.element.classList.add(consts.class.fontWeight300);
	}

	hideChallenges(): void {
		this.element.parentElement?.setAttribute(consts.attr.HIDE_CHALLENGES, '');
	}
}
