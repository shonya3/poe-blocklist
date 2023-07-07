import { Option } from '../../types';

export class Post {
	static POST_SELECTOR = 'tr:has(.content)' as const;
	element: HTMLTableRowElement;
	constructor(element: HTMLTableRowElement) {
		this.element = element;
	}

	isVisible() {
		return !Boolean(this.element.querySelector(':has(blocked-content)'));
	}

	buttons(): HTMLDivElement {
		return this.element.querySelector('div.buttons') as HTMLDivElement;
	}

	get username(): Option<string> {
		return this.element.querySelector('span.profile-link.post_by_account > a')?.textContent ?? null;
	}

	content(): Option<HTMLElement> {
		return this.element.querySelector('.content');
	}

	cells(): HTMLTableCellElement[] {
		return Array.from(this.element.querySelectorAll('td'));
	}

	contentCell(): Option<HTMLElement> {
		return this.element.querySelector('.content-container');
	}

	profileCell(): Option<HTMLElement> {
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
		return posts.filter(post => post.isVisible());
	}

	static hiddenPosts(posts: Post[] = Post.posts()): Post[] {
		return posts.filter(post => !post.isVisible());
	}
}
