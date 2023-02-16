import { SupportedLang } from './types';

export const getBrowserLang = (): SupportedLang => {
	const lang = navigator.language.split('-')[0];
	if (lang !== 'ru' && lang !== 'en') return 'en';
	return lang;
};
