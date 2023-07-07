import { SupportedLang } from '../../types';
import { translate } from '../../translate';
import { consts } from './consts';

export class CreatedBy {
	thread: HTMLTableRowElement;
	constructor(thread: HTMLTableRowElement) {
		this.thread = thread;
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

	set name(name: string) {
		this.element.textContent = name;
	}
	get name(): string {
		return this.element.textContent as string;
	}

	block(lang: SupportedLang): void {
		this.blockName(lang);
		this.hideChallenges();
		this.blocked = true;
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
