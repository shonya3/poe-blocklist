import { Option } from '../../types';
import { Author } from './Author';
import { hideElement, showElement } from './utils';

export class Post {
	static POST_SELECTOR = 'tr:has(.content)' as const;
	element: HTMLTableRowElement;
	author: Author | null = null;
	constructor(element: HTMLTableRowElement) {
		this.element = element;

		const name = this.username;
		if (name !== null) {
			this.author = new Author(this.element, name);
		}
	}

	isAuthorGGG(): boolean {
		return this.author?.isGGG === true;
	}

	hideChildren(): void {
		this.cells.forEach(td => hideElement(td));
	}

	showChildren(): void {
		this.cells.forEach(td => showElement(td));
	}

	get visible(): boolean {
		return !Boolean(this.element.querySelector(':has(blocked-content)'));
	}

	get buttons(): HTMLDivElement {
		return this.element.querySelector('div.buttons') as HTMLDivElement;
	}

	get username(): Option<string> {
		return this.element.querySelector('span.profile-link.post_by_account > a')?.textContent ?? null;
	}

	get content(): Option<HTMLElement> {
		return this.element.querySelector('.content');
	}

	get cells(): HTMLTableCellElement[] {
		return Array.from(this.element.querySelectorAll('td'));
	}

	get contentCell(): Option<HTMLElement> {
		return this.element.querySelector('.content-container');
	}

	get profileCell(): Option<HTMLElement> {
		return this.element.querySelector('.post_info');
	}

	static postElements() {
		return Array.from(document.querySelectorAll(Post.POST_SELECTOR)) as HTMLTableRowElement[];
	}

	static posts(postElements: HTMLTableRowElement[] = Post.postElements()): Post[] {
		return postElements.map(element => new Post(element));
	}

	static usernames(posts: Post[] = Post.posts()): string[] {
		return posts.filter(p => p.username !== null).map(p => p.username as string);
	}

	static uniqueUsernames(posts: Post[] = Post.posts()): string[] {
		return Array.from(new Set(Post.usernames(posts)));
	}

	static visiblePosts(posts: Post[] = Post.posts()): Post[] {
		return posts.filter(post => post.visible);
	}

	static hiddenPosts(posts: Post[] = Post.posts()): Post[] {
		return posts.filter(post => !post.visible);
	}
}
