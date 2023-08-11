import { html, render } from 'lit';
import { Dom } from './Dom';
import { HideRuthlessElement } from './wc-hide-ruthless';

export const hideRuthless = (hide: boolean, onHideChanged: (hide: boolean) => void) => {
	HideRuthlessElement.define();
	const dom = new Dom();
	if (!dom.is322PatchPage()) return;

	const contentBox = dom.contentBox();
	if (!(contentBox instanceof HTMLDivElement)) return;

	render(
		html`<wc-hide-ruthless
			@upd:hide=${(e: CustomEvent<boolean>) => {
				const eventHide = e.detail;
				onHideChanged(eventHide);
				dom.hideElements(eventHide);
			}}
			?hide=${hide}
			lang=${dom.lang}
		></wc-hide-ruthless>`,
		contentBox
	);

	dom.hideElements(hide);
};
