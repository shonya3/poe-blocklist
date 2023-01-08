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
		userTooltip: 'SHONYA3',
		keywordTooltip: 'harvest',
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

		userTooltip: {
			control: { type: 'text' },
		},

		keywordTooltip: {
			control: { type: 'text' },
		},
	},
} satisfies Meta<BlockedContent>;

export const Default = {
	render: ({ userTooltip, keywordTooltip, kind, postStyle }: BlockedContentProps) =>
		html`<blocked-content
			kind="${kind}"
			post-style="${postStyle}"
			user-tooltip="${ifDefined(userTooltip)}"
			keyword-tooltip="${ifDefined(keywordTooltip)}"
		></blocked-content>`,
};
