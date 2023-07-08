import { CreatedBy } from './CreatedBy';
import { LastUpdatedBy } from './LastUpdatedBy';
import { hideElement } from './utils';

export class Thread {
	element: HTMLTableRowElement;
	createdBy: CreatedBy;
	lastPostedBy: LastUpdatedBy;
	constructor(element: HTMLTableRowElement) {
		this.element = element;
		this.createdBy = new CreatedBy(element);
		this.lastPostedBy = new LastUpdatedBy(element);
	}

	hide() {
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
