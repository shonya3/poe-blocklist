import { Dom } from './Dom';
import { HideRuthlessElement } from './wc-hide-ruthless';

export const hideRuthless = (hide: boolean, onHideChanged: (hide: boolean) => void) => {
	HideRuthlessElement.define();
	const dom = new Dom();
	if (!dom.is322PatchPage()) return;
	dom.hideElements(hide);

	const contentBox = dom.contentBox();
	if (!(contentBox instanceof HTMLDivElement)) return;

	const hideRuthlessElement = document.createElement('wc-hide-ruthless');
	hideRuthlessElement.lang = dom.lang;
	contentBox.append(hideRuthlessElement);

	hideRuthlessElement.addEventListener('upd:hide', e => {
		const eventHide = (e as CustomEvent).detail as boolean;
		onHideChanged(eventHide);
		dom.hideElements(eventHide);
	});
};
