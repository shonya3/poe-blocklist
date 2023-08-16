import { SupportedLang } from '../../../types';
import { Post } from '../../dom/Post';
import { consts } from '../../dom/consts';
import { hideElement, showElement } from '../../dom/utils';

declare global {
	interface Document {
		startViewTransition: (cb: () => void) => Promise<void>;
	}
}

const setPosition = (container: HTMLElement, position: Position) => {
	for (const [key, value] of Object.entries(position)) {
		container.style.setProperty(key, value);
	}
};

const applyCss = (target: HTMLElement, styles: Record<string, string>) => {
	for (const [key, value] of Object.entries(styles)) {
		target.style.setProperty(key, value);
	}
};

interface Position {
	top?: string;
	right?: string;
	left?: string;
	bottom?: string;
	position?: 'fixed' | 'static' | 'sticky' | 'absolute' | 'relative';
}

type Where = 'top' | 'bottom' | null;

export class Dom {
	lang: SupportedLang;
	url: URL;
	#container: HTMLElement | null = null;
	#intersectionObserver: IntersectionObserver;
	#postElement: HTMLElement | null = Post.postElements()[0] ?? null;
	#intersectionTargetElement: HTMLElement | null = document.getElementById(
		'contentupdate3.22.0--pathofexile:trialoftheancestors'
	);

	get position(): Position {
		const { top, left, right, bottom } = window.getComputedStyle(this.#container!);
		return { top, left, right, bottom };
	}

	#where: Where = null;

	#topPosition(postElement: HTMLElement): Position {
		const { top, left, width } = postElement.getBoundingClientRect();

		return {
			position: 'fixed',
			top: `${top + window.scrollY}px`,
			left: `${left + width}px`,
		};
	}

	#bottomPosition: Position = {
		bottom: '1rem',
		right: '1rem',
		top: 'unset',
		left: 'unset',
		position: 'fixed',
	};

	#cssStyles: Record<string, string> = {
		padding: '1rem',
		width: '300px',
		'margin-left': '1rem',
		'background-color': 'rgba(0, 0, 0, 0.7)',
		height: '70px',
	};

	constructor() {
		this.url = new URL(window.location.href);
		this.lang = this.url.host.startsWith('ru.') ? 'ru' : 'en';

		this.#intersectionObserver = new IntersectionObserver(this.#intersectionCallback.bind(this));
		if (this.#intersectionTargetElement) {
			this.#intersectionObserver.observe(this.#intersectionTargetElement);
		}
	}

	set where(val: Where) {
		if (!this.#postElement) {
			this.#where = null;
			return;
		}

		this.#where = val;
	}

	get where() {
		return this.#where;
	}

	container(): HTMLElement | null {
		if (!this.is322PatchPage()) {
			return null;
		}

		if (this.#container !== null) {
			return this.#container;
		}

		const container = document.querySelector(`#${consts.PATCHNOTES_CHECKBOXES_CONTAINER_SELECTOR}`);
		if (container instanceof HTMLElement) {
			this.#container = container;
			return this.#container;
		}

		const containerEl = this.#createContainer();

		if (this.#postElement === null) {
			return null;
		}

		document.body.append(containerEl);
		this.#container = containerEl;
		window.scrollY < 700 ? this.#placeTop(this.#postElement, this.#container) : this.#placeBottom(this.#container);
		applyCss(this.#container, this.#cssStyles);

		return this.#container;
	}

	#intersectionCallback(entries: IntersectionObserverEntry[]) {
		const entry = entries[0];
		const rect = entry.intersectionRect;

		if (rect.x === 0) {
			if (window.scrollY < 700) {
				return;
			}
			const now = this.position;
			const then = this.#bottomPosition;

			this.#container!.animate([now, { ...then, transform: 'scale(1)' }] as Keyframe[], {
				fill: 'both',
				duration: 300,
				easing: 'ease-out',
			});
		} else {
			const now = this.position;
			const then = this.#topPosition(this.#postElement!);

			this.#container!.animate([now, { ...then, transform: 'scale(1.05)' }] as Keyframe[], {
				fill: 'both',
				duration: 350,
				easing: 'ease-out',
			});
		}
	}

	#placeTop(postElement: HTMLElement, container: HTMLElement) {
		setPosition(container, this.#topPosition(postElement));
		this.where = 'top';
	}

	#placeBottom(container: HTMLElement) {
		setPosition(container, this.#bottomPosition);
		this.where = 'bottom';
	}

	#createContainer(): HTMLElement {
		const containerEl = document.createElement('div');
		containerEl.id = consts.PATCHNOTES_CHECKBOXES_CONTAINER_SELECTOR;
		return containerEl;
	}

	is322PatchPage() {
		if (this.lang === 'ru') {
			return (
				this.url.pathname === '/forum/view-thread/3409618' ||
				this.url.pathname === '/forum/view-thread/3409618/page/1'
			);
		}

		if (this.lang === 'en') {
			return (
				this.url.pathname === '/forum/view-thread/3409617' ||
				this.url.pathname === '/forum/view-thread/3409617/page/1'
			);
		}
	}

	#contentBox(): HTMLDivElement | null {
		const box = document.querySelector('.box-content');
		if (box instanceof HTMLDivElement) {
			box.style.setProperty('position', 'relative');
			return box;
		}
		return null;
	}

	hideElements(hide: boolean) {
		const elements = this.elements();
		if (hide === true) {
			for (const element of elements) {
				hideElement(element);
			}
		} else if (hide === false) {
			for (const element of elements) {
				showElement(element);
			}
		}
	}

	#ruthlessNavList() {
		return document.querySelector('li:has(a[href="#ruthless-specificchanges"])');
	}

	elements() {
		const elements = [];
		const navList = this.#ruthlessNavList();
		if (navList) {
			elements.push(navList);
		}

		const ids = [
			'ruthless-specificchanges',
			'r-ascendancychanges',
			'r-guardian',
			'r-hierophant',
			'r-inquisitor',
			'r-assassin',
			'r-saboteur',
			'r-trickster',
			'r-berserker',
			'r-juggernaut',
			'r-chieftain',
			'r-raider',
			'r-deadeye',
			'r-pathfinder',
			'r-slayer',
			'r-gladiator',
			'r-champion',
			'r-necromancer',
			'r-occultist',
			'r-elementalist',
			'r-ascendant',
			'r-skillbalance',
			'r-atlaspassivetreechanges',
		];

		for (const id of ids) {
			const element = document.querySelector(`#${id}`);
			if (element) {
				elements.push(element);
			}
		}

		return elements;
	}
}
