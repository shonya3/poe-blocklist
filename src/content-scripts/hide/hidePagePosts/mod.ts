import { html, render } from 'lit';
import { Dom } from './Dom';
import { HidePagePostsElement } from './wc-hide-page-posts';

export const hidePagePosts = (hide: boolean, onHideChanged: (hide: boolean) => void) => {
	HidePagePostsElement.define();
	const dom = new Dom();

	const container = dom.container();
	if (container === null) return;

	const div = document.createElement('div');

	render(
		html`<wc-hide-page-posts
			@upd:hide=${(e: CustomEvent<boolean>) => {
				const eventHide = e.detail;
				onHideChanged(eventHide);
				dom.hideElements(eventHide);
			}}
			?hide=${hide}
			lang=${dom.lang}
		></wc-hide-page-posts>`,
		div
	);

	container.append(div);
	dom.hideElements(hide);
};
