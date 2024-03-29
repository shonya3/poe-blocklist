import { MyTab, MyTabGroup, MyTabPanel } from './mod';
MyTab.define();
MyTabGroup.define();
MyTabPanel.define();
import { html } from 'lit';

export default {
	title: 'Elements/my-tab-group',
	component: 'my-tab-group',
};

export const Default = {
	render: () =>
		html`<my-tab-group>
			<my-tab slot="nav" panel="users">users</my-tab>
			<my-tab slot="nav" panel="keywords">keywords</my-tab>

			<my-tab-panel name="users">List of users</my-tab-panel>
			<my-tab-panel name="keywords">List of keywords</my-tab-panel>
		</my-tab-group> `,
};

export const ActiveTab = {
	render: () =>
		html`
			<my-tab-group active-tab="keywords">
				<my-tab slot="nav" panel="users">users</my-tab>
				<my-tab slot="nav" panel="keywords">keywords</my-tab>

				<my-tab-panel name="users">List of users</my-tab-panel>
				<my-tab-panel name="keywords">List of keywords</my-tab-panel>
			</my-tab-group>
		`,
};
