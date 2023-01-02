export { IconMonkey } from './content-scripts/components/icons/icon-mokey';

export { BlockedContent } from './content-scripts/components/blocked-content/blocked-content';

export {};
export { IconBlockedUser } from './content-scripts/components/icons/icon-blocked-user';

customElements.define(
	'test-element',
	class extends HTMLElement {
		constructor() {
			super();
			this.attachShadow({
				mode: 'open',
			}).innerHTML = String.raw`<icon-blocked-user title="test-title"></icon-blocked-user>`;
		}
	}
);
