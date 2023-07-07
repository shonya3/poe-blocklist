import { CreatedBy } from './CreatedBy';
import { LastUpdatedBy } from './LastUpdatedBy';

export class Thread {
	element: HTMLTableRowElement;
	createdBy: CreatedBy;
	lastPostedBy: LastUpdatedBy;
	constructor(element: HTMLTableRowElement) {
		this.element = element;
		this.createdBy = new CreatedBy(element);
		this.lastPostedBy = new LastUpdatedBy(element);
	}

	static isThreadsView(): boolean {
		const { pathname } = new URL(window.location.href);
		return pathname.includes('view-forum');
	}
}
