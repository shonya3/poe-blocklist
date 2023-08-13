import { html, render } from 'lit';
import { Dom } from './Dom';
import { HideBugfixesElement } from './wc-hide-bugfixes';

export const hideBugfixes = (hide: boolean, onHideChanged: (hide: boolean) => void) => {
	HideBugfixesElement.define();
	const dom = new Dom();

	const container = dom.container();
	if (container === null) return;

	const div = document.createElement('div');

	render(
		html`<wc-hide-bugfixes
			@upd:hide=${(e: CustomEvent<boolean>) => {
				const eventHide = e.detail;
				onHideChanged(eventHide);
				dom.hideElements(eventHide);
			}}
			?hide=${hide}
			lang=${dom.lang}
		></wc-hide-bugfixes>`,
		div
	);

	container.append(div);

	dom.hideElements(hide);
};
