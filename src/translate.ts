import { SupportedLang } from './types';

const dictionary = {
	users: {
		en: 'users',
		ru: 'пользователи',
	},
	keywords: {
		en: 'keywords',
		ru: 'слова',
	},
	blockUser: {
		en: 'block user',
		ru: 'забанить юзера',
	},
	addKeyword: {
		en: 'add keyword',
		ru: 'добавить слово',
	},
	postStyle: {
		en: 'post style',
		ru: 'стиль',
	},
	language: {
		en: 'language',
		ru: 'язык',
	},
	settings: {
		en: 'settings',
		ru: 'настройки',
	},
	withIcons: {
		en: 'with icons',
		ru: 'иконки',
	},
	ru: {
		en: 'russian',
		ru: 'русский',
	},
	en: {
		en: 'english',
		ru: 'английский',
	},
	hideMessages: {
		en: 'Hide messages from this user',
		ru: 'Скрыть сообщения этого пользователя',
	},
	unblockUser: {
		en: 'Unblock this user',
		ru: 'Разблокировать этого пользователя',
	},
} as const;

export const translate = <Lang extends SupportedLang>(lang: Lang) => {
	return function t<Key extends keyof typeof dictionary>(key: Key): (typeof dictionary)[Key][Lang] {
		return dictionary[key][lang];
	};
};
