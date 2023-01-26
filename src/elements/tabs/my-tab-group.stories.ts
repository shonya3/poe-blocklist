import './mod';
import { html } from 'lit';

export default {
	title: 'Elements/my-tab-group',
	component: 'my-tab-group',
};

export const Default = {
	render: () =>
		html`<my-tab-group placement="start">
			<my-tab slot="nav" panel="users" active>General</my-tab>
			<my-tab slot="nav" panel="keywords">Custom</my-tab>

			<my-tab-panel name="users" active>List of users</my-tab-panel>
			<my-tab-panel name="keywords">List of keywords</my-tab-panel>
		</my-tab-group> `,
};
