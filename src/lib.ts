import { SupportedLang } from './types';

export const getBrowserLang = (): SupportedLang => {
	let lang = navigator.language.split('-')[0];
	if (lang !== 'ru' && lang !== 'en') lang = 'en';
	if (lang !== 'ru' && lang !== 'en') throw new Error('Not supported language');
	return lang;
};

export const nextTick = (): Promise<void> => new Promise(r => setTimeout(r));
