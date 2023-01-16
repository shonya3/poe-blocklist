import { ifDefined } from 'lit/directives/if-defined.js';
import { html } from 'lit';
import './blocked-content';
import { Meta } from '@storybook/web-components';
import { BlockedContent } from './blocked-content';
import { BlockedContentProps } from '../../../types';

export default {
	title: 'Elements/blocked-content',
	component: 'blocked-content',
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
} satisfies Meta<BlockedContent>;

export const Default = {
	render: ({ userTooltip, keywordTooltip, kind, postStyle, lang, withIcons }: BlockedContentProps) =>
		html`<blocked-content
			lang="${lang}"
			kind="${kind}"
			post-style="${postStyle}"
			user-tooltip="${ifDefined(userTooltip)}"
			keyword-tooltip="${ifDefined(keywordTooltip)}"
			?with-icons=${withIcons}
		></blocked-content>`,
};
