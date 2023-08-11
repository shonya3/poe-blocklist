import { SupportedLang } from '../../../types';
import { hideElement, showElement } from '../../dom/utils';

export class Dom {
	lang: SupportedLang;
	url: URL;

	constructor() {
		this.url = new URL(window.location.href);
		this.lang = this.url.host.startsWith('ru.') ? 'ru' : 'en';
	}

	is322PatchPage() {
		if (this.lang === 'ru') {
			return (
				this.url.pathname === '/forum/view-thread/3409618' ||
				'/forum/view-thread/3409618/page/1' ||
				'/forum/view-thread/3409617'
			);
		}

		if (this.lang === 'en') {
			return this.url.pathname === '/forum/view-thread/3409617' || '/forum/view-thread/3409618/page/1';
		}
	}

	contentBox(): HTMLDivElement | null {
		const box = document.querySelector('.box-content');
		if (box instanceof HTMLDivElement) {
			box.style.setProperty('position', 'relative');
			return box;
		}
		return null;
	}

	hideElements(hide: boolean) {
		const elements = this.ruthlessNotesElements();
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

	ruthlessNavList() {
		return document.querySelector('li:has(a[href="#ruthless-specificchanges"])');
	}

	ruthlessNotesElements() {
		const elements = [];
		const navList = this.ruthlessNavList();
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
