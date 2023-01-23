import { html } from 'lit';
import './vanilla-blocked-content';
import { Meta } from '@storybook/web-components';
import { VanillaBlockedContent } from './vanilla-blocked-content';
import { BlockedContentProps } from '../../../types';

const meta = {
	title: 'Elements/vanilla-blocked-content',
	component: 'blocked-content',
	args: {
		kind: 'post',
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
} satisfies Meta<VanillaBlockedContent>;

export const Default = {
	render: ({ userTooltip, keywordTooltip, kind, postStyle }: BlockedContentProps) =>
		html`<vanilla-blocked-content
			kind="${kind}"
			post-style="${postStyle}"
			user-tooltip="${userTooltip ?? ''}"
			keyword-tooltip="${keywordTooltip ?? ''}"
		></vanilla-blocked-content>`,
};

export default meta;
