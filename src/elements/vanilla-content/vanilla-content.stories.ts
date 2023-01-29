import { ifDefined } from 'lit/directives/if-defined.js';
import { html } from 'lit';
import './vanilla-content';
import { Meta } from '@storybook/web-components';
import { VanillaContent } from './vanilla-content';
import { BlockedContentProps } from '../../types';

export default {
	title: 'Elements/vanilla-content',
	component: 'vanilla-content',
	args: {
		kind: 'post',
		postStyle: 'normal',
		lang: 'en',
		userTooltip: 'SHONYA3',
		keywordTooltip: 'harvest',
		withIcons: true,
	},
	argTypes: {
		kind: {
			options: ['post', 'quote'],
			control: { type: 'radio' },
		},

		postStyle: {
			options: ['none', 'min', 'strict', 'normal', 'full'],
			control: { type: 'radio' },
		},

		lang: {
			options: ['ru', 'en'],
			control: { type: 'radio' },
		},

		userTooltip: {
			control: { type: 'text' },
		},

		keywordTooltip: {
			control: { type: 'text' },
		},

		withIcons: {
			control: { control: 'boolean' },
		},
	},
} satisfies Meta<VanillaContent>;

export const Default = {
	render: ({ userTooltip, keywordTooltip, kind, postStyle, lang, withIcons }: BlockedContentProps) =>
		html`<vanilla-content
			lang="${lang}"
			kind="${kind}"
			post-style="${postStyle}"
			user-tooltip="${ifDefined(userTooltip)}"
			keyword-tooltip="${ifDefined(keywordTooltip)}"
			?with-icons=${withIcons}
		></vanilla-content>`,
};
