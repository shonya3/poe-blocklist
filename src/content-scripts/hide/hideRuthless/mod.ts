import { html, render } from 'lit';
import { Dom } from './Dom';
import { HideRuthlessElement } from './wc-hide-ruthless';

export const hideRuthless = (hide: boolean, onHideChanged: (hide: boolean) => void) => {
	HideRuthlessElement.define();
	const dom = new Dom();

	const container = dom.container();
	if (container === null) return;

	const div = document.createElement('div');

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
		div
	);

	container.append(div);
	dom.hideElements(hide);
};
