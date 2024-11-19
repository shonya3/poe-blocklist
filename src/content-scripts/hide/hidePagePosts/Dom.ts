import { SupportedLang } from '../../../types';
import { Post } from '../../Dom/Post';
import { consts } from '../../Dom/consts';
import { hideElement, showElement } from '../../Dom/utils';

export class Dom {
	lang: SupportedLang;
	url: URL;
	#container: HTMLElement | null = null;

	constructor() {
		this.url = new URL(window.location.href);
		this.lang = this.url.host.startsWith('ru.') ? 'ru' : 'en';
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

		const contentBox = this.#contentBox();
		if (!contentBox) return null;

		const containerEl = document.createElement('div');
		containerEl.style.setProperty('position', 'absolute');
		containerEl.style.setProperty('top', '0.6rem');
		containerEl.style.setProperty('right', '1rem');
		containerEl.id = consts.PATCHNOTES_CHECKBOXES_CONTAINER_SELECTOR;

		contentBox.append(containerEl);
		this.#container = containerEl;
		return this.#container;
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

	elements() {
		return Post.postElements().slice(1);
	}
}
