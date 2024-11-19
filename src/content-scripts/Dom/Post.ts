import { Option } from '../../types';
import { Author } from './Author';
import { hideElement, showElement } from './utils';

export class Post {
	static POST_SELECTOR = 'tr:has(.content)' as const;
	element: HTMLTableRowElement;
	author: Author;
	constructor(element: HTMLTableRowElement) {
		this.element = element;

		this.author = new Author(this.element);
	}

	get discriminated_username(): string | null {
		return this.author.name.discriminated;
	}

	get indiscriminated_username(): string | null {
		return this.author.name.indiscriminated;
	}

	static discriminated_usernames(posts: Post[] = Post.posts()): string[] {
		return posts.filter(p => p.author.name.discriminated).map(p => p.author.name.discriminated as string);
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

	static uniqueUsernames(posts: Post[] = Post.posts()): string[] {
		return Array.from(new Set(Post.discriminated_usernames(posts)));
	}

	static visiblePosts(posts: Post[] = Post.posts()): Post[] {
		return posts.filter(post => post.visible);
	}

	static hiddenPosts(posts: Post[] = Post.posts()): Post[] {
		return posts.filter(post => !post.visible);
	}
}
