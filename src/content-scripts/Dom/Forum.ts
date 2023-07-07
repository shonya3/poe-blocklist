import { LastUpdatedBy } from './LastUpdatedBy';

export class Forum {
	element: HTMLTableRowElement;
	lastPostedBy: LastUpdatedBy;
	constructor(element: HTMLTableRowElement) {
		this.element = element;
		this.lastPostedBy = new LastUpdatedBy(element);
	}

	static isForumsView(): boolean {
		const { pathname } = new URL(window.location.href);
		return pathname === '/forum';
	}

	static forumElements(): HTMLTableRowElement[] {
		if (!Forum.isForumsView()) return [];
		return Array.from(document.querySelectorAll('tr:has(.last_post a)'));
	}

	static forums(): Forum[] {
		return Forum.forumElements().map(element => new Forum(element));
	}
}
