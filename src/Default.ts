import { getBrowserLang } from './lib';
import { PostStyle, SupportedLang } from './types';
export const Default = {
	postStyle: 'min',
	withIcons: true,
	lang: getBrowserLang,
	hideThreadsCreatedByBlockedUsers: false,
	hide_by_indiscriminated_username_aswell: false,
} satisfies {
	postStyle: PostStyle;
	withIcons: boolean;
	lang: () => SupportedLang;
	hideThreadsCreatedByBlockedUsers: boolean;
	hide_by_indiscriminated_username_aswell: boolean;
};
