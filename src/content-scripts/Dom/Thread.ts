import { CreatedBy } from './CreatedBy';
import { LastPostedBy } from './LastPostedBy';
import { hideElement } from './utils';

export class Thread {
	element: HTMLTableRowElement;
	createdBy: CreatedBy;
	lastPostedBy: LastPostedBy;
	constructor(element: HTMLTableRowElement) {
		this.element = element;
		this.createdBy = new CreatedBy(element);
		this.lastPostedBy = new LastPostedBy(element);
	}

	hide(): void {
		hideElement(this.element);
	}

	static isThreadsView(): boolean {
		const { pathname } = new URL(window.location.href);
		return pathname.includes('view-forum');
	}

	static threadElements(): HTMLTableRowElement[] {
		if (!Thread.isThreadsView()) return [];
		return Array.from(document.querySelectorAll('tr:has(.thread)'));
	}

	static threads(): Thread[] {
		return Thread.threadElements().map(element => new Thread(element));
	}
}
