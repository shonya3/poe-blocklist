import { getBrowserLang } from './lib';
import { PostStyle, SupportedLang } from './types';
export const Default = {
	postStyle: 'min',
	withIcons: true,
	lang: getBrowserLang,
} satisfies {
	postStyle: PostStyle;
	withIcons: boolean;
	lang: () => SupportedLang;
};
